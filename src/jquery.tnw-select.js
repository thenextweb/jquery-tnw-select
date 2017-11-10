/**
 * TNW Select
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

const pluginName = "tnwSelect"

class TNWSelect {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init() {
        this.$el.wrap($("<div/>").addClass(this.options.classNameWrapper))
            .after($("<div/>").addClass(this.options.classNameLabel).text(this.getLabel()))
        this.$wrapper = this.$el.closest("." + this.options.classNameWrapper)

        this.$el.on("blur", () => {
            this.$wrapper.removeClass(this.options.classNameFocus);
        })

        this.$el.on("change", () => {
            this.$wrapper.children("." + this.options.classNameLabel).text(this.getLabel())
            this.$wrapper.removeClass(this.options.classNameFocus);
        })

        this.$el.on("focus mousedown", () => {
            this.$wrapper.addClass(this.options.classNameFocus);
        })
    }

    getLabel() {
        let $selected = this.$el.children(":selected")

        if ($selected.length) {
            return $selected.text()
        }

        return this.$el.children().first().text();
    }

    update() {
        this.$wrapper.children("." + this.options.classNameLabel).text(this.getLabel())
    }
}

TNWSelect.prototype.defaults = {
    classNameFocus: "is-focus",
    classNameLabel: "form-select-label",
    classNameWrapper: "form-select"
}

$.fn[pluginName] = function (options) {
    return this.each(function () {
        let instance = $(this).data(pluginName)

        if (!instance) {
            $(this).data(pluginName, new TNWSelect(this, options))
        } else {
            if (typeof options === "string") {
                instance[options]()
            }
        }
    })
}