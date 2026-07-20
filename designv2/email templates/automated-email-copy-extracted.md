# Automated Email Copy Extracted

Source: `designv2/email templates/incoming/automated-email-content`

Visible body copy has been extracted from each HTML email section and trimmed before the standard risk warning. Subject lines are taken from each HTML `<title>` and preview text from the hidden preheader where present.

---

## Onboarding, welcome series

### Email 1: welcome signups

**Subject line:** Welcome to Abundance

**Preview text:** Make an impact on your doorstep

#### Copy blocks

**Hero heading:** Welcome to Abundance

**Hero subheading:** Our municipal investments finance the projects that make our places thrive

**Paragraph:**

We're thrilled you've signed up for an account. You're now just moments away from investing in meaningful green and social projects throughout the country.

**Paragraph:**

Ready to build your municipal investment portfolio? You can start today. If you have questions first, you'll find comprehensive information on our website. If you need additional help, please do not hesitate to get in touch.

**Asset: investment stats**
- INTEREST RATE: `{{ subscriber.email_rate }}`
- TERM: `{{ subscriber.email_term }}`
- CAPITAL REPAID: `{{ subscriber.email_capital }}`

**CTA / button:** INVEST NOW

**Asset / section heading:** Three good reasons to invest with us

**Asset copy / short line:** Start from just £5

**Asset copy / short line:** You can start investing in minutes

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** LEARN MORE

---

## Onboarding, welcome series

### Email 1 - welcome, soft signups

**Subject line:** Welcome to Abundance

**Preview text:** Invest to upgrade our neighbourhoods

#### Copy blocks

**Hero heading:** Our municipal investments help you make an impact on your doorstep

**Paragraph:**

Thank you for signing up to learn more about our municipal investments. We're delighted to have you onboard. If you're ready to invest, follow the link below to the investment page, where you can set up a free Abundance account and be up and running in minutes.

**Paragraph:**

If you need more information before getting started, don't worry. Over the coming weeks, we'll send you several emails explaining how our municipal investments work. These will introduce you to how these investments can benefit both your financial future and local communities.

**Asset: investment stats**
- INTEREST RATE: `{{ subscriber.email_rate }}`
- TERM: `{{ subscriber.email_term }}`
- CAPITAL REPAID: `{{ subscriber.email_capital }}`

**CTA / button:** INVEST NOW

**Asset / section heading:** Three good reasons to invest

**Asset copy / short line:** Start from just £5

**Asset copy / short line:** You can start investing in minutes

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** WHY INVEST

---

## Onboarding, welcome series

### Email 2 - open investments

**Subject line:** Start your investment portfolio today

**Preview text:** Earn 4.0% a year | Make an impact

#### Copy blocks

**Hero heading:** Grow your investment portfolio today

**Dynamic field:** `{{ subscriber.email_open_strap }}`

**Paragraph:**

You can keep building your municipal investment portfolio now with one of our open investments. Invest today to back real climate action projects - including green energy and energy efficiency - across our towns, cities and countryside.

**Asset: investment stats**
- INTEREST RATE: `{{ subscriber.email_rate }}`
- TERM: `{{ subscriber.email_term }}`
- CAPITAL REPAID: `{{ subscriber.email_capital }}`

**CTA / button:** INVEST NOW

**Asset / section heading:** A future income for you, a brighter future for the places we live

**Asset copy / short line:** Create a stable income

**Paragraph:**

Get a stable and flexible income option that can help support your financial plans - whether you are growing your money or want to generate an income.

**Asset copy / short line:** Learn more

**Asset copy / short line:** Deliver real green projects

**Paragraph:**

You know exactly what your money is being used to fund, because these investments comply with the internationally recognised Green & Social Loan Principles.

**Asset copy / short line:** Learn more

---

## Onboarding, welcome series

### Email 3 - Esmee open investments

**Subject line:** Boosting local investor impact

**Preview text:** 50% match funding when you invest locally

#### Copy blocks

**Hero heading:** Boosting local investor impact

**Hero subheading:** 100% match funding when you invest in your local council

**Paragraph:**

The Esmée Fairbairn Foundation, one of the UK's leading social and impact investors, is amplifying the effect of local support for municipal investments on Abundance.

**Paragraph:**

For every pound invested by local residents, Esmée will invest alongside them, matching 100% of the investment – accelerating progress on climate projects that matter most to your community.

**Paragraph:**

It is just another compelling reason to upgrade your neighbourhood with an Abundance investment.

**Asset: investment stats**
- INTEREST RATE: `{{ subscriber.email_rate }}`
- TERM: `{{ subscriber.email_term }}`
- CAPITAL REPAID: `{{ subscriber.email_capital }}`

**CTA / button:** INVEST NOW

---

## Onboarding, welcome series

### Email 4 - how it works

**Subject line:** Getting to know our green investments

**Preview text:** A flexible way to invest and make a difference

#### Copy blocks

**Hero heading:** Getting to know our flexible investments

**Hero subheading:** It couldn't be easier to make an investment that makes a real difference

**Paragraph:**

Our municipal investments are a great way to invest in a better future. You lend money to UK councils for a fixed period to fund real green and social projects, and in return you earn a stable income for the entire investment term.

**Paragraph:**

It really is as simple as that. And you can be up and running making investments in real green and social local projects with us in minutes, starting from just £5.

**Asset copy / short line:** Pick your investment

**Asset copy / short line:** Choose from a range of options, or mix and match to create a portfolio

**Asset copy / short line:** Create an account

**Paragraph:**

You'll need a free Abundance account to invest, which you set up online

**Paragraph:**

Get investing!

**Asset copy / short line:** Once you have completed the final checks, you can invest straight away

**CTA / button:** LEARN MORE

**Asset / section heading:** Investment benefits that suit you, and the planet

**Asset copy / short line:** Tax free ISA returns

**Paragraph:**

You can invest through an Innovative Finance ISA, which means no tax on any investment returns for the life of your investments.

**CTA / button:** LEARN MORE

**Asset copy / short line:** Building better places

**Paragraph:**

It can be hard to see the impact your investments make. Not with us - because every £ you invest is spent on real green and social projects.

**CTA / button:** LEARN MORE

**Asset / section heading:** Your questions answered

**Paragraph:**

Are there any fees for investing?

**Paragraph:**

How do I know councils will spend my money on green and social projects?

**Paragraph:**

How do these investments fit into my portfolio?

**Paragraph:**

What if my council goes bust?

---

## Onboarding, welcome series

### Email 5 - impact

**Subject line:** If you can't draw it, don't invest in it

**Preview text:** Every £ is spent on real green and social projects

#### Copy blocks

**Hero heading:** If you can't draw it, don't invest in it

**Hero subheading:** Make an investment where you can see exactly what your money is doing

**Paragraph:**

Our municipal investments pack a real punch on making a tangible impact. But you don’t have to take that on trust. That's because they are compliant with the Green & Social Loan Principles

**Paragraph:**

so you can be confident that every pound you invest is really supporting the transition to a greener, fairer future for us all.

**Asset copy / short line:** Spent on projects so far

**Dynamic field:** `{{ subscriber.email_projects_amount }}`

**Asset copy / short line:** Projects funded

**Dynamic field:** `{{ subscriber.email_projects }}`

**CTA / button:** LEARN MORE

**Asset copy / short line:** Make an impact

**Paragraph:**

Your money can finance real projects that are building a greener, fairer future for communities across the country.

**Asset label:** READ CASE STUDIES

---

## Onboarding, welcome series

### Email 6 - financial needs intro

**Subject line:** Look after your financial future

**Preview text:** Earn a stable long term income

#### Copy blocks

**Hero heading:** Look after your financial future

**Hero subheading:** Our municipal investments offer a fixed, stable income

**Paragraph:**

Our municipal investments make it easy for everyone to invest in a better future for the places we care about, with a range of features that help them fit into your financial plans.

**Paragraph:**

Because they offer predictable regular returns, they are a great option for people looking for a low risk way to invest for the long term, beyond traditional savings. So you can build a more sustainable future for your money, and for the places we all share.

**Asset copy / short line:** Regular investments

**Asset copy / short line:** New municipal loans launching every 3 months

**Asset copy / short line:** Predictable income

**Asset copy / short line:** Get regular payments every 6 months

**Asset copy / short line:** Diversify your money

**Asset copy / short line:** Another low risk option for your portfolio

**CTA / button:** LEARN MORE

**Paragraph:**

What's the risk?

**Asset copy / short line:** Lending to councils is a low risk option

**Paragraph:**

Investing in local government is low risk, due to the way it is regulated and, importantly for investors, they cannot go bankrupt to avoid paying debts.

**CTA / button:** LEARN MORE

---

## Onboarding, welcome series

### Email 7 - councils

**Subject line:** Invest in those who invest in you

**Preview text:** Councils are at the heart of delivering positive change

#### Copy blocks

**Hero heading:** Invest in those who are investing in you

**Hero subheading:** Councils are investing in the infrastructure that makes our places thrive

**Paragraph:**

Councils are the bedrocks of our communities, with a wide range of responsibilities to look after our places today and for the future. But how do our municipal investments fit in to what they do?

**Paragraph:**

You can learn more about the central role that local government plays in delivering real change on green and social issues - including some quick audio explainers to get you up to speed - on our website.

**CTA / button:** LEARN MORE

**Paragraph:**

Want to know more?

**Asset copy / short line:** Watch our webinar for a deeper dive

---

## Disengaged email series

### Email 1 - open investments, no investments yet

**Subject line:** Start building your investment portfolio

**Preview text:** Municipal investments are open now

#### Copy blocks

**Hero heading:** Start building your investment portfolio

**Hero subheading:** Municipal investments are open now

**Paragraph:**

You haven't started your investment journey with us, but now is a great time to get going. Lock in regular, predictable returns and help finance green and social projects across the country with our open investments.

**Paragraph:**

You can be up and running investing in minutes, starting from just £5.

**Asset: investment stats**
- INTEREST RATE: `{{ subscriber.email_rate }}`
- TERM: `{{ subscriber.email_term }}`
- CAPITAL REPAID: `{{ subscriber.email_capital }}`

**CTA / button:** INVEST NOW

**Asset / section heading:** Three good reasons to invest with us

**Asset copy / short line:** Start from just £5

**Asset copy / short line:** You can start investing in minutes

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** LEARN MORE

---

## Disengaged email series

### Email 1 - version for people with 1 investment

**Subject line:** Why build a portfolio of municipal investments?

**Preview text:** Create a low risk income portfolio

#### Copy blocks

**Hero heading:** Why build a portfolio of municipal investments?

**Hero subheading:** A new way to create a low risk, regular income

**Paragraph:**

You've invested in one council so far, which means some of your money is already working to deliver real green and social projects.

**Paragraph:**

Have you considered broadening your muncipal investments? There are several benefits. Not only would more of your money be doing good, but you'd also be building a regular, predictable income to support your financial plans. Why not invest again? We have investments open right now.

**Asset copy / short line:** Regular investments

**Asset copy / short line:** New municipal loans launching every 3 months

**Asset copy / short line:** Predictable income

**Asset copy / short line:** Get regular payments every 6 months

**Asset copy / short line:** Diversify your money

**Asset copy / short line:** Another low risk option for your portfolio

**CTA / button:** INVEST NOW

**Asset copy / short line:** A brighter future for you and the place you live

**Asset copy / short line:** Create a stable income

**Paragraph:**

Get a stable and reliable income option that can help support your financial plans - whether you are growing your money or want to generate an income.

**Asset copy / short line:** Learn more

**Asset copy / short line:** Deliver real green and social projects

**Paragraph:**

You know exactly what your money is being used to fund, because these investments comply with the internationally recognised Green Loan Principles.

**Asset copy / short line:** Learn more

---

## Disengaged email series

### Email 2 - easy to invest reminder

**Subject line:** An easy way to make real impact investments

**Preview text:** Grow your portfolio in less than a minute

#### Copy blocks

**Hero heading:** An easy way to make real impact investments

**Hero subheading:** It takes less than a minute to grow your portfolio now

**Paragraph:**

Some investments are really complicated. Our municipal investments aren't. You lend money to councils to help finance green and social projects, and in return you get a regular, predictable income.

**Paragraph:**

You have already made your first investment, so the hard part is out of the way. Simply log into your account and grow your portfolio with one of our open investments today!

**Asset copy / short line:** Start from just £5

**Asset copy / short line:** You can start investing in minutes

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** LEARN MORE

**Asset copy / short line:** Investments with benefits for you and your community

**Asset copy / short line:** Tax free ISA returns

**Paragraph:**

You can invest through an Innovative Finance ISA, which means no tax on any investment returns for the life of your investments.

**CTA / button:** LEARN MORE

**Asset copy / short line:** Building better places

**Paragraph:**

It can be hard to see the impact your investments make. Not with us - because every £ you invest is spent on real green and social projects.

**CTA / button:** LEARN MORE

**Asset / section heading:** Your questions answered

**Paragraph:**

Are there any fees for investing?

**Paragraph:**

How do I know councils will spend my money on green and social projects?

**Paragraph:**

How do these investments fit into my portfolio?

**Paragraph:**

What if my council goes bust?

---

## Disengaged email series

### Email 3 - financial needs reminder

**Subject line:** A better way to create a stable income

**Preview text:** Regular payments, and income you can rely on

#### Copy blocks

**Hero heading:** A better way to create a stable income

**Hero subheading:** Regular payments mean you can get an income you can rely on

**Paragraph:**

If you're among the millions of UK residents who want to generate income from their savings and investments, you're in luck. Building a portfolio of our municipal investments offers a low-risk, flexible income option for your financial strategy.

**Paragraph:**

Our municipal investments offer predictable regular returns, they are a great option for people looking for a low risk way to invest for the long term, beyond traditional savings. So you can build a more sustainable future for your money, and for the places we all share.

**Paragraph:**

All our municipal investments provide these regular six-monthly payments. So why not start your investment portfolio to create a predictable income stream tailored to your needs.

**Asset copy / short line:** Regular investments

**Asset copy / short line:** New municipal loans launching every 3 months

**Asset copy / short line:** Predictable income

**Asset copy / short line:** Get regular payments every 6 months

**Asset copy / short line:** Diversify your money

**Asset copy / short line:** Another low risk option for your portfolio

**CTA / button:** LEARN MORE

**Paragraph:**

What's the risk?

**Asset copy / short line:** Lending to councils is a low risk option

**Paragraph:**

Investing in local government is low risk, due to the way it is regulated. And, importantly for investors, councils cannot go bankrupt to avoid paying debts.

**CTA / button:** LEARN MORE

---

## Disengaged email series

### Email 3 - works for you

**Subject line:** An impact investment that works for you

**Preview text:** Flexible, tax free returns to help manage your money

#### Copy blocks

**Hero heading:** An impact investment that works for you

**Hero subheading:** Flexible, tax free returns can help you manage your money

**Paragraph:**

Our municipal investments are a great way for you to back real green projects. But have you considered whether these investments might give you a valuable new option for your financial planning?

**Paragraph:**

As well as making a positive impact, these investments give you a range of benefits that fit into the way you like to organise your money. Why not give them a look?

**Asset copy / short line:** Predictable income

**Asset copy / short line:** Regular payments every 6 months

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** LEARN MORE

**Asset copy / short line:** Make an impact

**Paragraph:**

Your money can help councils invest in a brighter, greener future for the communities they serve.

**Asset label:** READ CASE STUDIES

**Asset / section heading:** Your questions answered

**Paragraph:**

Are there any fees for investing?

**Paragraph:**

How do I know councils will spend my money on green and social projects?

**Paragraph:**

How do these investments fit into my portfolio?

**Paragraph:**

What if my council goes bust?

---

## Disengaged email series

### Email 4  -impact

**Subject line:** Your money could be making a bigger difference

**Preview text:** Get real green and social projects happening on our streets

#### Copy blocks

**Hero heading:** Your money could be making a big difference

**Hero subheading:** Back councils to get real green and social projects happening on our streets

**Paragraph:**

Our municipal investments offer a direct way to help build a better future for our places. That's because every pound you invest helps finance tangible green and projects in communities across the country.

**Paragraph:**

That is a direct investment impact that is difficult to beat - especially these days when so many investments don't make it easy for you to see what your money is doing.

**Paragraph:**

Begin your journey with us today through one of our open council investments and see your money create real, positive change on your local streets.

**Asset copy / short line:** Spent on projects so far

**Dynamic field:** `{{ subscriber.email_projects_amount }}`

**Asset copy / short line:** Projects funded

**Dynamic field:** `{{ subscriber.email_projects }}`

**CTA / button:** INVEST NOW

**Asset copy / short line:** Make an impact

**Paragraph:**

Your money can help support projects that are already making places greener and more resilient for the future.

**Asset label:** READ CASE STUDIES

---

## Disengaged email series

### Email 5 - do you still want to invest

**Subject line:** Are you still interested in investing?

**Preview text:** Back real green and social projects, starting from £5

#### Copy blocks

**Hero heading:** Are you still interested in investing?

**Hero subheading:** Back real green and social projects, starting from £5

**Paragraph:**

Abundance is the UK’s platform for local investment. Our municipal investments let people invest directly in places — creating financial returns for them, and a better future for our communities.

**Paragraph:**

When we ask people about how they feel about their money and investing, we often hear the same things. Investing can feel disconnected from our daily lives, with returns seeming to have more to do with bubbles and speculation than making real things happen. And that complexity can make it difficult for people to make investment choices they can be confident about.

**Paragraph:**

That’s why we created our municipal investments. They are a simple way to invest that feels more connected to the places and communities we care about.

**Paragraph:**

Ready to make your money work for good? We have council investments open right now, and you can start investing in just minutes.

**Asset copy / short line:** Start from just £5

**Asset copy / short line:** You can start investing in minutes

**Asset copy / short line:** Make a real impact

**Asset copy / short line:** Finance real green and social projects

**Asset copy / short line:** Tax free ISA returns

**Asset copy / short line:** Grow your nest egg with an IF ISA

**CTA / button:** INVEST NOW
