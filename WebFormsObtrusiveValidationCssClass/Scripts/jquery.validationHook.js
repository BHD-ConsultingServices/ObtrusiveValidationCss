// dynamically apply css to control being validated on a validation error

(function ($) {
    $.validationHook = {};
    $.validationHook.options = {
        className: 'validationError'
    };

    if (typeof(ValidationSummaryOnSubmit) === "function") {
        var originalValidationSummaryOnSubmit = ValidationSummaryOnSubmit;

        ValidationSummaryOnSubmit = function (validationGroup) {

            var dict = {};

            for (var i = 0; i < Page_Validators.length; i++) {
                var val = Page_Validators[i];
                if ((typeof (val.enabled) == "undefined" || val.enabled !== false) &&
                    IsValidationGroupMatch(val, validationGroup)) {

                    var controlToValidate = val.controltovalidate;
                    dict[controlToValidate] =
                        dict.hasOwnProperty(controlToValidate)
                        ? val.isvalid && dict[controlToValidate]
                        : val.isvalid;
                } else {
                    if (!dict.hasOwnProperty(val.controltovalidate)) {
                        dict[val.controltovalidate] = true;
                    }
                }
            }

            for (var key in dict) {
                if (dict.hasOwnProperty(key)) {
                    var value = dict[key];
                    $("#" + key).toggleClass($.validationHook.options.className, !value);
                }
            }

            return originalValidationSummaryOnSubmit(validationGroup);
        }
    }
}(jQuery));