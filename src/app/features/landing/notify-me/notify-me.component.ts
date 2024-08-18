import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'sudoku-notify-me',
  templateUrl: './notify-me.component.html',
  styleUrls: ['./notify-me.component.scss'],
})
export class NotifyMeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) { }

  public form!: FormGroup;
  public loading: boolean = false;
  public success!: boolean;

  // Getter
  private get email(): string {
    return this.form.get('email')?.value;
  }

  public get buttonText(): string{
    return !this.success ? 'Notify me' : 'We will notify you on: ' + this.email;
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })    
  }

  public onSubmit(): void {
    if(!this.form.valid)
      return;

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.success = true;     
    }, 2000);
    this.emailService.sendEmail(this.email).subscribe(x=>console.log(x));
  }
}