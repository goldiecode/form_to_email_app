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
    // Get info from  the form
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
    // You can find more info and experiment with this using a website like https://mailtolinkgenerator.com/

    // This section begins the string and includes the variable that stores the adviser's email address.
    // This tells the email client to open a new email window and put the advEmail content in as the 'to' address.
    const mailto = 'mailto:' + advEmail + '?';

    // This is a variable to construct the subject line. It is designed to let the subject line be dynamic.
    // A dynamic subject line provides more information for the recipient.
    // More information for the recipient improves their user experience.
    const subject =
      'Subject=RE%3A%20WRAP402%20Request%20%5B' +
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
      '%0A%0A***Please%20ensure%20sells%20are%20in%20place%20to%20cover%20the%20income%20payments%20and%20any%20charges%20due.***%0A%0A';
    const sig =
      'Documentation%20has%20been%20issued%20to%20yourselves%20and%20the%20client.%0A%0APlease%20be%20aware%20that%20the%20old%20drawdown%20forms%20%28Wrap350%2C%20Wrap354%2C%20Wrap356%29%20have%20been%20discontinued.%20Please%20use%20the%20new%20consolidated%20form%20%28Wrap402%29%20for%20instructing%20new%20payments%20going%20forward.%0A%0AThank%20you%20for%20using%20abrdn.%0A%0AKind%20Regards%2C%0A%0A' +
      name +
      '%0ACustomer%20Operations%20Representative%0AClient%20Engagement%20Hub%0A%0A%0A';
    const a = document.createElement('a');

    // This puts all the parts above together in one string for the email client to handle.
    a.href = mailto + subject + body + sig;

    // This launches the request to the host.
    a.click();
  }
}
