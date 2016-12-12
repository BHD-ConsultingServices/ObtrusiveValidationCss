/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/WebForms/WebUIValidation.d.ts" />

namespace Validation {

    export class Options {
        static ValidationErrorCssClass = "validationError";
    }

    class Hook {
        private static originalValidationSummaryOnSubmit: IValidationSummaryOnSubmit;

        static init(): void {
            const validation = (window as WebUIValidation);

            Hook.originalValidationSummaryOnSubmit = validation.ValidationSummaryOnSubmit;
            validation.ValidationSummaryOnSubmit = (validationGroup: string): boolean => {
                Hook.applyClass(validationGroup);
                return Hook.originalValidationSummaryOnSubmit(validationGroup);
            }
        }

        static applyClass(validationGroup: string) {
            const dict = {};
            const validation = (window as WebUIValidation);

            for (let i = 0; i < validation.Page_Validators.length; i++) {
                const val = validation.Page_Validators[i];
                if ((typeof (val.enabled) === "undefined" || val.enabled !== false) &&
                    validation.IsValidationGroupMatch(val, validationGroup)) {

                    const controlToValidate = val.controltovalidate;
                    dict[controlToValidate] = dict.hasOwnProperty(controlToValidate)
                        ? val.isvalid && dict[controlToValidate]
                        : val.isvalid;
                } else {
                    if (!dict.hasOwnProperty(val.controltovalidate)) {
                        dict[val.controltovalidate] = true;
                    }
                }
            }

            for (let key in dict) {
                if (dict.hasOwnProperty(key)) {
                    const value = dict[key];
                    $(`#${key}`).toggleClass(Options.ValidationErrorCssClass, !value);
                }
            }
        }
    }

    Hook.init();
}