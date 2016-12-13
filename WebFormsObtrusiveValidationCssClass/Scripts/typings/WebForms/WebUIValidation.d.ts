interface ValidatorTarget extends HTMLElement {
    htmlFor: string;

    tagName: string;

    Validators: Validator[];
}

interface Validator extends HTMLElement {

    controltovalidate: string;

    enabled: boolean;

    isvalid : boolean;

    validationGroup: string;
}

interface IIsValidationGroupMatch {
    (control: Validator, validationGroup: string): boolean;
}

interface IValidationSummaryOnSubmit {
    (validationGroup: string): boolean;
}

interface WebUIValidation extends Window {
    IsValidationGroupMatch: IIsValidationGroupMatch;

    Page_IsValid: boolean;

    Page_Validators: Validator[];

    ValidationSummaryOnSubmit: IValidationSummaryOnSubmit;

    ValidatorOnChange: EventListener;
}