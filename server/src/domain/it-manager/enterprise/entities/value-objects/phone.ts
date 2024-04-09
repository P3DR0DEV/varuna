export class Phone {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static format(phone: string, locale: 'pt-BR' | string = 'pt-BR') {
    if (locale !== 'pt-BR') {
      return new Phone(phone)
    }

    const normalized = phone.replace(/\D/g, '')

    return new Phone(normalized)
  }
}
