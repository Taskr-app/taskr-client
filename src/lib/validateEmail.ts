import { WrappedFormUtils } from 'antd/lib/form/Form';

export const validateEmail = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateEmails = (form: WrappedFormUtils<any>, formItemId: string) => (_: any, value: string, callback: any) => {
  const { getFieldValue } = form;
  const formValue = getFieldValue(formItemId)
  if (value && formValue) {
    formValue.forEach((formItem: string) => {
      if (validateEmail(formItem)) {
        callback()
      } else {
        callback(`${formItem} is not a valid email`)
      }
    })
  }
}