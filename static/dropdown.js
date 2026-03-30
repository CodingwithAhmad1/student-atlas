(function() {
	'use strict';

	function CustomDropdown(container) {
		this.container = container;
		this.searchable = container.dataset.searchable === 'true';
		this.autoSubmit = container.dataset.autoSubmit === 'true';
		this.required = container.dataset.required === 'true';
		this.placeholder = container.dataset.placeholder || '';
		this.isOpen = false;
		this.focusedIndex = -1;

		this.hiddenInput = container.querySelector('input[type="hidden"]');
		this.trigger = container.querySelector('.dropdown-trigger');
		this.triggerText = container.querySelector('.dropdown-trigger-text');
		this.panel = container.querySelector('.dropdown-panel');
		this.optionsList = container.querySelector('.dropdown-options');
		this.options = Array.prototype.slice.call(container.querySelectorAll('.dropdown-option'));
		this.noResults = container.querySelector('.dropdown-no-results');

		// For searchable dropdowns, the trigger IS the search input
		if (this.searchable) {
			this.searchInput = this.trigger;
			this._savedDisplayValue = '';
		} else {
			this.searchInput = container.querySelector('.dropdown-search');
		}

		// Type-ahead buffer for non-searchable dropdowns
		this._typeAheadBuffer = '';
		this._typeAheadTimer = null;

		this._bindEvents();
		this._syncDisplay();
	}

	CustomDropdown.prototype._syncDisplay = function() {
		var value = this.hiddenInput.value;
		if (this.searchable) {
			if (value) {
				this.trigger.value = value;
			}
			// placeholder is handled by the HTML placeholder attribute
		} else {
			if (value) {
				this.triggerText.textContent = value;
				this.triggerText.classList.remove('placeholder');
			} else if (this.placeholder) {
				this.triggerText.textContent = this.placeholder;
				this.triggerText.classList.add('placeholder');
			}
		}
		if (value) {
			this.options.forEach(function(opt) {
				opt.setAttribute('aria-selected', opt.dataset.value === value ? 'true' : 'false');
			});
		}
	};

	CustomDropdown.prototype._bindEvents = function() {
		var self = this;

		if (this.searchable) {
			// Click on the input or its wrapper opens the dropdown
			this.trigger.addEventListener('click', function() {
				if (!self.isOpen) {
					self.open();
				}
			});

			this.trigger.addEventListener('focus', function() {
				if (!self.isOpen) {
					self.open();
				}
			});

			// Typing in the trigger input filters the list
			this.trigger.addEventListener('input', function() {
				if (!self.isOpen) {
					self.open();
				}
				self.filter(self.trigger.value);
			});
		} else {
			this.trigger.addEventListener('click', function(e) {
				e.preventDefault();
				self.toggle();
			});

			if (this.searchInput) {
				this.searchInput.addEventListener('input', function() {
					self.filter(this.value);
				});
			}
		}

		this.options.forEach(function(opt, i) {
			opt.addEventListener('click', function() {
				self.select(opt.dataset.value, opt.textContent.trim());
			});
			opt.addEventListener('mouseenter', function() {
				self._setFocused(i);
			});
		});

		this.trigger.addEventListener('keydown', function(e) {
			self._handleKeydown(e);
		});

		if (!this.searchable && this.searchInput) {
			this.searchInput.addEventListener('keydown', function(e) {
				self._handleKeydown(e);
			});
		}

		// Form validation
		if (this.required) {
			var form = this.container.closest('form');
			if (form) {
				form.addEventListener('submit', function(e) {
					if (!self.hiddenInput.value) {
						e.preventDefault();
						self.container.classList.add('error');
						self.trigger.focus();
					}
				});
			}
		}
	};

	CustomDropdown.prototype.toggle = function() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	};

	CustomDropdown.prototype.open = function() {
		// Close other open dropdowns
		document.querySelectorAll('.custom-dropdown .dropdown-panel.open').forEach(function(p) {
			var otherContainer = p.closest('.custom-dropdown');
			if (otherContainer && otherContainer._dropdown) {
				otherContainer._dropdown.close();
			}
		});

		this._positionPanel();
		this.panel.classList.add('open');
		this.trigger.setAttribute('aria-expanded', 'true');
		this.isOpen = true;

		if (this.searchable) {
			// Save current display value so we can restore on close
			this._savedDisplayValue = this.trigger.value;
			this.trigger.value = '';
			this.filter('');
			this.trigger.focus();
		} else if (this.searchInput) {
			this.searchInput.value = '';
			this.filter('');
			this.searchInput.focus();
		}

		// Scroll selected option into view
		var selected = this.optionsList.querySelector('[aria-selected="true"]');
		if (selected) {
			selected.scrollIntoView({ block: 'nearest' });
		}
	};

	CustomDropdown.prototype.close = function() {
		this.panel.classList.remove('open');
		this.panel.classList.remove('flip');
		this.trigger.setAttribute('aria-expanded', 'false');
		this.isOpen = false;
		this.focusedIndex = -1;
		this.options.forEach(function(opt) { opt.classList.remove('focused'); });

		// Restore display value for searchable triggers
		if (this.searchable) {
			this.trigger.value = this._savedDisplayValue || '';
		}
	};

	CustomDropdown.prototype.select = function(value, label) {
		this.hiddenInput.value = value;
		this.container.classList.remove('error');

		if (this.searchable) {
			this._savedDisplayValue = label;
			this.trigger.value = label;
		} else {
			this.triggerText.textContent = label;
			this.triggerText.classList.remove('placeholder');
		}

		this.options.forEach(function(opt) {
			opt.setAttribute('aria-selected', opt.dataset.value === value ? 'true' : 'false');
		});

		this.close();

		if (this.autoSubmit) {
			var form = this.container.closest('form');
			if (form) form.submit();
		}
	};

	CustomDropdown.prototype.filter = function(query) {
		var q = query.toLowerCase().trim();
		var visibleCount = 0;
		var firstMatch = -1;
		var firstStartsWith = -1;
		var visibleIndex = 0;

		this.options.forEach(function(opt) {
			var text = opt.textContent.toLowerCase().trim();
			if (!q || text.indexOf(q) === 0) {
				opt.classList.remove('hidden');
				if (q && firstMatch === -1) {
					firstMatch = visibleIndex;
				}
				visibleCount++;
				visibleIndex++;
			} else {
				opt.classList.add('hidden');
			}
		});

		if (this.noResults) {
			if (visibleCount === 0) {
				this.noResults.classList.add('visible');
			} else {
				this.noResults.classList.remove('visible');
			}
		}

		// Auto-focus the first match
		this.focusedIndex = -1;
		this.options.forEach(function(opt) { opt.classList.remove('focused'); });
		if (q && visibleCount > 0 && firstMatch !== -1) {
			this._setFocused(firstMatch);
		}
	};

	CustomDropdown.prototype._getVisibleOptions = function() {
		return this.options.filter(function(opt) {
			return !opt.classList.contains('hidden');
		});
	};

	CustomDropdown.prototype._setFocused = function(index) {
		this.options.forEach(function(opt) { opt.classList.remove('focused'); });
		var visible = this._getVisibleOptions();
		if (index >= 0 && index < visible.length) {
			this.focusedIndex = index;
			visible[index].classList.add('focused');
			visible[index].scrollIntoView({ block: 'nearest' });
		}
	};

	CustomDropdown.prototype._handleKeydown = function(e) {
		var visible = this._getVisibleOptions();

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!this.isOpen) {
					this.open();
				} else {
					this._setFocused(Math.min(this.focusedIndex + 1, visible.length - 1));
				}
				break;

			case 'ArrowUp':
				e.preventDefault();
				if (this.isOpen) {
					this._setFocused(Math.max(this.focusedIndex - 1, 0));
				}
				break;

			case 'Enter':
				e.preventDefault();
				if (this.isOpen && this.focusedIndex >= 0 && this.focusedIndex < visible.length) {
					var opt = visible[this.focusedIndex];
					this.select(opt.dataset.value, opt.textContent.trim());
				} else if (!this.isOpen) {
					this.open();
				}
				break;

			case 'Escape':
				if (this.isOpen) {
					e.preventDefault();
					this.close();
					this.trigger.focus();
				}
				break;

			case 'Tab':
				if (this.isOpen) {
					this.close();
				}
				break;

			case 'Home':
				if (this.isOpen && visible.length > 0) {
					e.preventDefault();
					this._setFocused(0);
				}
				break;

			case 'End':
				if (this.isOpen && visible.length > 0) {
					e.preventDefault();
					this._setFocused(visible.length - 1);
				}
				break;

			default:
				// Type-ahead for non-searchable dropdowns
				if (!this.searchable && this.isOpen && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
					this._handleTypeAhead(e.key, visible);
				}
				break;
		}
	};

	CustomDropdown.prototype._handleTypeAhead = function(char, visible) {
		var self = this;

		// Clear previous timer and accumulate characters
		clearTimeout(this._typeAheadTimer);
		this._typeAheadBuffer += char.toLowerCase();

		// Reset buffer after 600ms of no typing (matches native select behavior)
		this._typeAheadTimer = setTimeout(function() {
			self._typeAheadBuffer = '';
		}, 600);

		var buffer = this._typeAheadBuffer;

		// First pass: find an option starting with the full accumulated buffer
		var matchIndex = -1;
		for (var i = 0; i < visible.length; i++) {
			var text = visible[i].textContent.toLowerCase().trim();
			if (text.indexOf(buffer) === 0) {
				matchIndex = i;
				break;
			}
		}

		// If accumulated buffer has no match and it's a single repeated char,
		// cycle through options starting with that char (like native select)
		if (matchIndex === -1 && buffer.length > 1) {
			var allSameChar = true;
			for (var j = 1; j < buffer.length; j++) {
				if (buffer[j] !== buffer[0]) {
					allSameChar = false;
					break;
				}
			}
			if (allSameChar) {
				var singleChar = buffer[0];
				var startFrom = this.focusedIndex >= 0 ? this.focusedIndex + 1 : 0;
				// Search from current position forward, then wrap around
				for (var k = 0; k < visible.length; k++) {
					var idx = (startFrom + k) % visible.length;
					var optText = visible[idx].textContent.toLowerCase().trim();
					if (optText.indexOf(singleChar) === 0) {
						matchIndex = idx;
						break;
					}
				}
			}
		}

		if (matchIndex !== -1) {
			this._setFocused(matchIndex);
		}
	};

	CustomDropdown.prototype._positionPanel = function() {
		this.panel.classList.remove('flip');
		var rect = this.container.getBoundingClientRect();
		var spaceBelow = window.innerHeight - rect.bottom;
		if (spaceBelow < 300 && rect.top > spaceBelow) {
			this.panel.classList.add('flip');
		}
	};

	// Close on outside click
	document.addEventListener('click', function(e) {
		document.querySelectorAll('.custom-dropdown').forEach(function(container) {
			if (container._dropdown && container._dropdown.isOpen && !container.contains(e.target)) {
				container._dropdown.close();
			}
		});
	});

	// Auto-initialize
	document.addEventListener('DOMContentLoaded', function() {
		document.querySelectorAll('.custom-dropdown').forEach(function(container) {
			container._dropdown = new CustomDropdown(container);
		});
	});
})();
