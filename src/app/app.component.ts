import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // This object stores the values entered in the form
  emailTemplate = this.fb.group({
    name: ['John', Validators.required],
    advName: ['Robert', Validators.required],
    advEmail: ['random@company.com', [Validators.required, Validators.email]],
    plan: ['X123', Validators.required],
    surname: ['Smith', Validators.required],
    type: ['', Validators.required],
    payDate: ['2022-03-26', Validators.required],
    emailCreated: [false],
  });

  setVal(fbCtrl: string, val: string) {
    this.emailTemplate.get(fbCtrl).patchValue(val);
  }

  dateTime() {
    const dT = new Date();
    return formatDate(dT, 'd, MMMM, y,', 'en-GB');
  }

  resetForm() {
    this.emailTemplate.patchValue({
      advName: [],
      advEmail: [],
      plan: [],
      surname: [],
      type: [],
      payDate: [],
      emailCreated: [false],
    });
  }

  constructor(private fb: FormBuilder) {}

  createEmail() {
    // Store the inputs from the form here
    const d = this.emailTemplate.value;
    this.emailTemplate.get('emailCreated').patchValue(true);

    const name = d.name;
    const advName = d.advName;
    const advEmail = d.advEmail;
    const plan = d.plan.toUpperCase();
    const surname = d.surname.toUpperCase();
    const type = d.type;
    const date = d.payDate;
    const dateFormatted = formatDate(date, 'd MMMM, y.', 'en-GB');

    // To launch an email through the host native client, it must be delivered in the format of a mailto string.

    // This section begins the string and includes the variable that stores the adviser's email address.
    // This tells the email client to open a new email window and put the advEmail content in as the 'to' address.
    const mailto = 'mailto:' + advEmail + '?';

    // This is a variable to construct the subject line. It is designed to let the subject line be dynamic.
    // A dynamic subject line provides more information for the recipient.
    // More information for the recipient improves their user experience.
    const subject =
      'Subject=RE%3A%20PAYMENT%20Request%20%5B' +
      plan +
      '%20' +
      surname +
      '%5D%20Status%20Update%3A%20Complete&';

    // This variable stores the submitted datapoints (from the form) for presenting in the body of the email.
    const body =
      'Body=Hello%20' +
      advName +
      '%2C%0A%0AThis%20' +
      type +
      '%20payment%20request%20has%20now%20been%20processed.%20This%20will%20take%20effect%20from%3A%20' +
      dateFormatted +
      '%0A%0A';
    const sig =
      'Documentation%20has%20been%20issued%20to%20yourselves%20and%20the%20client.%0A%0A*This%20is%20a%20good%20place%20to%20put%20information%20pertaining%20to%20the%20service%20in%20general%2C%20or%20forward%20notice%20of%20changes%20in%20service%20down%20the%20pipeline.*%0A%0AThank%20you%20for%20using%20OURCOMPANYINC.%0A%0AKind%20Regards%2C%0A%0A' +
      name +
      '%0ADigital%20Services%20Agent%20%0ACustomer%20Servicing%20Team%0A%0A%0A';
    const a = document.createElement('a');

    // This puts all the parts above together in one string for the email client to handle.
    a.href = mailto + subject + body + sig;

    // This launches the request to the host.
    a.click();
  }
}
