interface ValidationElement extends HTMLElement {

    controltovalidate: string;

    enabled: boolean;

    isvalid : boolean;

    validationGroup: string;
}

interface IIsValidationGroupMatch {
    (control: ValidationElement, validationGroup: string): boolean;
}

interface IValidationSummaryOnSubmit {
    (validationGroup: string): boolean;
}

interface WebUIValidation extends Window {
    IsValidationGroupMatch: IIsValidationGroupMatch;

    Page_IsValid: boolean;

    Page_Validators: ValidationElement[];

    ValidationSummaryOnSubmit: IValidationSummaryOnSubmit;
}