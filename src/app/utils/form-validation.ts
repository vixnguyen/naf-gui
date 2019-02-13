/**
 * Form field definitions
 */
export interface FormField {
  isValid: boolean;
  isTouched: boolean;
  value: any;
  rules?: any;
  errors?: any;
  onChange?: any;
  [key: string]: any;
}

/**
 * Form validtion definitions
 */
export interface FormValidation {
  [key: string]: any;
}

export class FormValidation {
  form: any;

  /**
   * Constructor new form
   * @param form is a data input
   * @output form is a new form validation
   */
  constructor(form: any) {
    let fields: any = {};
    let isValid = true; //default is valid
    /**
     * loop and set data for each field
     */
    for (let key in form) {
      fields[key] = {
        name: key,
        isValid: false,
        isTouched: false,
        value: form[key].value || undefined,
        rules: form[key].rules || {},
        errors: {},
        onChange: this._handleChange
      };
      /**
       * call function to validate each field
       * if field invalid is detected, set value of form to invalid too
       */
      if (!this._fieldValidate(fields[key], false)) {
        isValid = false;
      }
    }
    // set data for form validation
    this.form = {
      data: {},
      isValid: isValid,
      isTouched: false,
      fields: fields,
      fieldChange: this._fieldChange
    };
    return this.form;
  }

  /**
   * Validate a specific field
   * @param field is Form Field object
   * @param hasChanged is a flag to check if the form field has changed or not
   * @output boolean is a state of field
   */
  private _fieldValidate = (field: any, hasChanged: boolean = true) => {
    let rule: any;
    field.isTouched = hasChanged;
    field.isValid = true;
    field.errors = {};
    // loop each rule
    for (let key in field.rules) {
      rule = field.rules[key];
      /**
       * if field value is not mapping with the rule, set field is invalid and push the error
       */
      if (!rule(field.value)) {
        field.isValid = false;
        field.errors[key] = true;
      }
    }
    if (hasChanged) {
      // call function to update form data, after field updated
      this._updateData();
    }
    return field.isValid;
  };

  private _handleChange = (value: any) => {
    this._fieldValidate(this, value);
  };

  /**
   * Update form data
   */
  private _updateData = () => {
    let data: any = {};
    let isValid = true;
    // loop each field
    for (let key in this.form.fields) {
      // push it into form data with key-value structur
      data[key] = this.form.fields[key].value;
      if (!this.form.fields[key].isValid) {
        // set form is invalid if have one field invalid
        isValid = false;
      }
    }
    this.form.data = data;
    this.form.isValid = isValid;
  };

  private _fieldChange = (name: string, value: any) => {
    this.form.fields[name].value = value;
    this._fieldValidate(this.form.fields[name]);
  };

  validation() {
    return this.form;
  }
}
