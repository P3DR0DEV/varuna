import { test, expect } from 'vitest'
import { Phone } from './phone'

test('Should be able to format a phone, removing non-numeric characters', () => {
  const phone = Phone.format('(31) 99999-9999', 'pt-BR')

  expect(phone.value).toEqual('31999999999')
})

test('Should return the same phone', () => {
  const phone = Phone.format('(31) 99999-9999', 'en-US')

  expect(phone.value).toEqual('(31) 99999-9999')
})
