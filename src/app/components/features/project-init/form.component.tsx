import * as React from 'react';
import { ElectronHelper } from 'app/utils/electron.helper';
import { FormValidation } from 'app/utils/form-validation';
import { setTimeout } from 'timers';

export namespace ProjectInitForm {
  export interface Props {
    //
  }
  export interface State {
    isProcessing: boolean; // to check the form is submitting or not, it helps handle UI/UX
    form: FormValidation; // form validation
  }
}

export class ProjectInitForm extends React.Component<ProjectInitForm.Props, ProjectInitForm.State> {

  dialog: any;
  spawn: any;
  app: any;
  path: any;

  constructor(props: ProjectInitForm.Props, state: ProjectInitForm.State) {
    super(props, state);
    const electron: any = new ElectronHelper();
    this.dialog = electron.remote.dialog;
    this.spawn = electron.childProcess.spawn;
    const { app } = electron.remote;
    this.app = app;
    // initial state of this component
    this.state = {
      isProcessing: false,
      form: this.initForm()
    };
  }

  /**
   * Initial Form
   * @output a new form validation is an object
   * Seeing FormValidation definitions for more detail
   */
  initForm = () => {
    /**
     * define fields value and rule to validate
     */
    return new FormValidation({
      directory: {
        value: '',
        rules: {
          required: (value: any) => {
            if (value) {
              return value.trim() !== '';
            } else {
              return false;
            }
          }
        }
      },
      projectName: {
        value: '',
        rules: {
          required: (value: any) => {
            if (value) {
              return value.trim() !== '';
            } else {
              return false;
            }
          }
        }
      },
      dbName: {
        value: '',
        rules: {
          required: (value: any) => {
            if (value) {
              return value.trim() !== '';
            } else {
              return false;
            }
          }
        }
      }
    });
  };

  onOpenDialog = () => {
    const path = this.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (path) {
      this.path = path[0];
      this.state.form.fields['directory'].value = path[0];
    } else {
      // do nothing
    }
    console.log(this.state.form);
    this.state.form.validation();
    this.formChange();
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ isProcessing: true });
    this.createProject();
  }

  /**
   * Handle event change a specific field
   * @param event is a object
   */
  handleChange = (e: any) => {
    const { name, value } = e.target;
    /**
     * call method field change which is provide by form field validation
     */
    this.state.form.fieldChange(name, value);
  };

  formChange = () => {
    // update form state
    this.setState({
      form: this.state.form
    });
  };

  createProject = () => {
    let npmVersionCmd = this.spawn(
      'naf',
      [ 'init' ],
      { cwd: this.path }
    );
    npmVersionCmd.stdin.write('xyz\n', 'utf8');
    setTimeout(() => {
      npmVersionCmd.stdin.write('xyz\n', 'utf8');
    }, 3000);
    npmVersionCmd.stdout.on('data', (data: any) => {
      console.log(`${npmVersionCmd.stdout._writableState.destroyed}`, npmVersionCmd.stdout._writableState);
      // npmVersionCmd = null;
      console.log(`data: ${data}`);
    });
    npmVersionCmd.on('exit', (data: any) => {
      // npmVersionCmd = null;
      console.log(`data exit 1: ${data}`);
    });
    console.log(npmVersionCmd);
  }

  render() {
    return (
      <section className="form">
        <form onSubmit={this.onSubmit} onChange={this.formChange} >
          <div className="row">
            <div className="form-group col-6">
              <label className="form-label required">Project Name</label>
              <input
                className={`form-input ${
                  !this.state.form.fields['projectName'].isValid &&
                  this.state.form.fields['projectName'].isTouched
                    ? 'invalid'
                    : ''
                }`}
                name="projectName"
                value={this.state.form.fields['projectName'].value || ''}
                onChange={this.handleChange}
              />
              <span className="error-msg">Enter Project Name.</span>
            </div>
            <div className="form-group col-6">
              <label className="form-label required">Database Name</label>
              <input
                className={`form-input ${
                  !this.state.form.fields['dbName'].isValid && this.state.form.fields['dbName'].isTouched
                    ? 'invalid'
                    : ''
                }`}
                name="dbName"
                value={this.state.form.fields['dbName'].value || ''}
                onChange={this.handleChange}
              />
              <span className="error-msg">Enter Database Name.</span>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <label className="form-label required">Directory</label>
              <input
                className={`form-input ${
                  !this.state.form.fields['directory'].isValid &&
                  this.state.form.fields['directory'].isTouched
                    ? 'invalid'
                    : ''
                }`}
                name="directory"
                placeholder="Browse ..."
                value={this.state.form.fields['directory'].value || ''}
                onClick={this.onOpenDialog}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="submit"
                className={`btn btn-primary btn-animated ${
                  this.state.isProcessing ? 'show' : 'hide'
                }`}
                disabled={this.state.isProcessing || !this.state.form.isValid}
              >
                <span className="animated-icon">
                  <i className="fa fa-spinner fa-spin" />
                </span>
                <span className="animated-label">Initialize</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
