---
template: ContactPage
slug: contact
title: Contact
featuredImage: https://ucarecdn.com/e22a858a-b420-47af-99f6-ed54b6860333/
subtitle: Contact Page has a subtitle
address: '404 James St, Burleigh Heads QLD 4220'
phone: 0987 123 456
email: example@example.com
locations:
  - lat: '-27.9654732'
    lng: '153.2432449'
    mapLink: ''
meta:
  description: test meta description
  title: test meta title
---

# Example contact form

This form is setup to use Netlify's form handling:

- the form action is set to the current absolute url: `action: '/contact/'`
- a name attribute is sent with the form's data `'form-name': 'Contact'`
- netlify data attributes are added to the form `data-netlify data-netlify-honeypot`

Find out more in the [Netlify Docs](https://www.netlify.com/docs/form-handling/).
