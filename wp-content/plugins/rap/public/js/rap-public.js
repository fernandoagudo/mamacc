/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.19
 *
 * Requires: jQuery >= 1.2.3
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register module depending on jQuery using requirejs define.
        define(['jquery'], factory);
    } else {
        // No AMD.
        factory(jQuery);
    }
}(function ($) {
    $.fn.addBack = $.fn.addBack || $.fn.andSelf;

    $.fn.extend({

        actual: function (method, options) {
            // check if the jQuery method exist
            if (!this[method]) {
                throw '$.actual => The jQuery method "' + method + '" you called does not exist';
            }

            var defaults = {
                absolute: false,
                clone: false,
                includeMargin: false,
                display: 'block'
            };

            var configs = $.extend(defaults, options);

            var $target = this.eq(0);
            var fix, restore;

            if (configs.clone === true) {
                fix = function () {
                    var style = 'position: absolute !important; top: -1000 !important; ';

                    // this is useful with css3pie
                    $target = $target.clone().attr('style', style).appendTo('body');
                };

                restore = function () {
                    // remove DOM element after getting the width
                    $target.remove();
                };
            } else {
                var tmp = [];
                var style = '';
                var $hidden;

                fix = function () {
                    // get all hidden parents
                    $hidden = $target.parents().addBack().filter(':hidden');
                    style += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

                    if (configs.absolute === true) style += 'position: absolute !important; ';

                    // save the origin style props
                    // set the hidden el css to be got the actual value later
                    $hidden.each(function () {
                        // Save original style. If no style was set, attr() returns undefined
                        var $this = $(this);
                        var thisStyle = $this.attr('style');

                        tmp.push(thisStyle);
                        // Retain as much of the original style as possible, if there is one
                        $this.attr('style', thisStyle ? thisStyle + ';' + style : style);
                    });
                };

                restore = function () {
                    // restore origin style values
                    $hidden.each(function (i) {
                        var $this = $(this);
                        var _tmp = tmp[i];

                        if (_tmp === undefined) {
                            $this.removeAttr('style');
                        } else {
                            $this.attr('style', _tmp);
                        }
                    });
                };
            }

            fix();
            // get the actual value with user specific methed
            // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
            // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
            var actual = /(outer)/.test(method) ?
                $target[method](configs.includeMargin) :
                $target[method]();

            restore();
            // IMPORTANT, this plugin only return the value of the first element
            return actual;
        }
    });
}));

(function ($) {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */
    $(document).ready(function () {

        $(".tabla_productero").each(function () {

            var mapHeightsNombre = $(this).find(".nombre-productero").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightNombre = Math.max.apply(null, mapHeightsNombre);

            let nombreProducteroClass = $(this).find(".nombre-productero");
            if (!$(nombreProducteroClass).hasClass("nojs")) {
                nombreProducteroClass.height(maxHeightNombre);
            }
            //////////////////////////////////////////

            var mapHeightsCaracteristicas = $(this).find(".productero_amazon_caracteristicas").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightCaracteristicas = Math.max.apply(null, mapHeightsCaracteristicas);
            $(this).find(".productero_amazon_caracteristicas").height(maxHeightCaracteristicas);
            //////////////////////////////////////////

            var mapHeightsVentajas = $(this).find(".productero_amazon_pros").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightVentajas = Math.max.apply(null, mapHeightsVentajas);
            $(this).find(".productero_amazon_pros").height(maxHeightVentajas);
            //////////////////////////////////////////

            var mapHeightsDesventajas = $(this).find(".productero_amazon_contras").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightDesventajas = Math.max.apply(null, mapHeightsDesventajas);
            $(this).find(".productero_amazon_contras").height(maxHeightDesventajas);
            //////////////////////////////////////////

            var mapHeightsNombreproducteroAmazon = $(this).find(".productero_amazon_title").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightNombreproducteroAmazon = Math.max.apply(null, mapHeightsNombreproducteroAmazon);
            let producteroAamazonTitle = $(this).find(".productero_amazon_title");
            if (!$(producteroAamazonTitle).hasClass("nojs")) {
                producteroAamazonTitle.height(maxHeightNombreproducteroAmazon);
            }
            //////////////////////////////////////////

            var mapHeightsCajaProductero = $(this).find(".cajaproductero").map(function () {
                return $(this).actual('height');
            }).get();
            var maxHeightsCajaProductero = Math.max.apply(null, mapHeightsCajaProductero);
            let cajaProductero = $(this).find(".cajaproductero");

            if ($(cajaProductero) !== undefined && $(cajaProductero).attr('class').indexOf("encabezado") === -1) {
                cajaProductero.height(maxHeightsCajaProductero);
            }
            //////////////////////////////////////////

        });
    });

})(jQuery);
