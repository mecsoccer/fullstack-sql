type Form = Record<string, unknown>

export const handleNameInput = (
  name: string, value: string, form: Form, cb: Function
) => {
  value = value.trim().toLowerCase()
  const regex = /^([a-z]+-?[a-z]+){1,255}$/gi;
  const formTemp = {...form} as any;

  formTemp[name] = { value, validation: regex.test(value) ? true : false };

  cb(formTemp);
};

export const handleEmailInput = (
  name: string, value: string, form: Form, cb: Function
) => {
  value = value.trim().toLowerCase().replace(/\d/g,'');
  const regex = /^[a-z\d][\w.-]+@[a-z\d]+\..+$/gi
  const formTemp = {...form} as any;

  formTemp[name] = { value, validation: regex.test(value) ? true : false };

  cb(formTemp);
};


export const handlePasswordInput = (
  name: string, value: string, form: Form, cb: Function
) => {
  value = value.trim()
  const regex = /.{3}/gi;
  const formTemp = {...form} as any;

  formTemp[name] = { value, validation: regex.test(value) ? true : false };

  cb(formTemp);
};
