/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/WebForms/WebUIValidation.d.ts" />

namespace Validation {

    export class Options {
        static ValidationErrorCssClass = "validationError";
    }

    class Hook {
        private static originalValidationSummaryOnSubmit: IValidationSummaryOnSubmit;

        private static originalValidatorOnChange: EventListener;

        static init(): void {
            const validation = (window as WebUIValidation);

            // Page validation
            Hook.originalValidationSummaryOnSubmit = validation.ValidationSummaryOnSubmit;
            validation.ValidationSummaryOnSubmit = (validationGroup: string): boolean => {
                Hook.handlePageValidation(validationGroup);
                return Hook.originalValidationSummaryOnSubmit(validationGroup);
            }

            // Validated control changes
            Hook.originalValidatorOnChange = validation.ValidatorOnChange;
            validation.ValidatorOnChange = (event: Event): void => {
                Hook.originalValidatorOnChange(event);
                Hook.handleValidatorUpdate(event);
            }
        }

        static handlePageValidation(validationGroup: string) {
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

        static handleValidatorUpdate(event: Event): void {
            event = event || window.event;

            let targetedControl: ValidatorTarget;
            if ((typeof (event.srcElement) != "undefined") && (event.srcElement != null)) {
                targetedControl = event.srcElement as ValidatorTarget;
            }
            else {
                targetedControl = event.target as ValidatorTarget;
            }

            let vals: Validator[];
            if (typeof (targetedControl.Validators) !== "undefined") {
                vals = targetedControl.Validators;
            }
            else {
                if (targetedControl.tagName.toLowerCase() === "label") {
                    targetedControl = document.getElementById(targetedControl.htmlFor) as ValidatorTarget;
                    vals = targetedControl.Validators;
                }
            }

            if (vals) {
                let isValid = true;
                for (let i = 0; i < vals.length; i++) {
                    if (!vals[i].isvalid) {
                        isValid = false;
                        break;
                    }
                }

                $(targetedControl).toggleClass(Options.ValidationErrorCssClass, !isValid);
            }
        }
    }

    Hook.init();
}