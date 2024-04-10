import { Slug } from './slug'

test('Should be able to create a slug', () => {
  const slug = Slug.createFromText('Text slug with spaces')

  expect(slug.value).toEqual('text-slug-with-spaces')
})
