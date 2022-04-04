# GFCI—A study in Feedback

**Feedback** in UX is how a system communicates to its users. It's something that we often take for granted
with physical goods. We know that knobs have resistance, and toggles _click_. A great example of UX feedback
is a ground-fault protected (GFCI) outlet. We'll use one to guide our learning!

Let's explore this UX term with the traditional 5Ws:

- [What](#what)
- [Who](#who)
- [When](#when)
- [Where](#where)
- [Why](#why)

Starting with **What** allows us to get a better idea of the term itself. Then discussing **who** is responsible
for and affected by it will provide focus for **when** and **where** to emphasize feedback. Finally, we'll close
with **why**. Hopefully by the end the why will be clear. Either way, I'll put some links there that underline
the importance of feedback in software.

## What

Discussing feedback in UX is often easier with an example of poor feedback.

We've all encountered an app or website where we navigate to where we want to go, and (almost inevitably) when you
get to the point where it's time to pay for some good or service, everything seems to stop. Immediately, the
questions start spinning.

Did they sell out?  
What happened to my money?  
Will I have to restart this whole process?

All of this panic that sets in could be solved with a spinner and some other visual, audio, or tactile (mobile) queues
to the user! That's feedback.

### Example

Using our GFCI, we can see that the feedback we receive is visual: the button depresses. We get tactile feedback
when we press a real one. The resistance in each button grows with the depth that it's depressed! We can't
replicate that exactly in mobile devices, but we can use vibration to provide feedback to the user on severity
and length of interaction. Additionally, we get auditory feedback. The button clicks when it falls in place.

### Considerations

Often when we consider feedback in UX and dev, we think of visual feedback for buttons. Hover states, active states,
etc. are good starts, but sometimes an additional sensory is appropriate, and might just be that extra oomph
your product needs to surprise and delight your users. Consider audio and tactile feedback too! Motion can help
indicate intent as well.

One often overlooked area of feedback relates not so much to direct actions as to events. Logs, error messages,
confirmations, alerts; all of these are examples of feedback. It's important to keep in mind that sometimes one
may have _too much_ feedback, and that can be as big a problem as _not enough_ feedback.

> TL;DR When designing and developing products, consider what information you give to your users. Sensory feedback is crucial for creating realistic experiences, and copy defines the conversation between the user and the system.

[Back to top](#gfcia-study-in-feedback)

## Who

Designers are primarily responsible for thinking through what feedback is appropriate, but the entire product team
should consider it from their various areas of expertise.

### Testing/QA

Test engineers have unique insight into the value that is provided to a user via logs and messages. Additionally,
they know what _feels_ right.

### Dev

Developers know the industry standards for interactive UI elements, like buttons, links, etc. These include hover states and
appropriate accommodations for accessibility. Beyond that, they should take a moment to think through how they would like
to see errors and unexpected behavior handled. In other words, whatever I know about what "done" or "broken" means, I should
pass along some version of that information to the user.

### Product Management/Ownership and Stakeholder (esp. Technical Writing)

Product people should be aware of the messaging sent to the users. How much information is too much? How much is too little?
An example might help.

I'd like to buy a special edition "The Child" plush keychain accessory (for a friend, of course). I fill out my shipping info,
then my billing info, confirm the price, then click "Place Order".

In the eyes of the system, a lot happens here.

- Take shipping info
- Cache shipping info
- Check billing info
- Cache billing info
- Calculate shipping costs
- Confirm and display price

And that doesn't include anything that happens on the server side to actually place the order!

Chances are, you'll want some way to communicate at least one of those steps to the user, but may not need words to do so.
And a simple check mark likely won't be enough to confirm that the order is placed!

### Designers

This could be a whole other post in itself, and there are entire courses dedicated to this specific overlap. But I'll just
make a case for having someone with an emphasis in interaction design (IxD) on the team or available to consult. Having a
UX Writing specialist can be invaluable here too.

> TL;DR Everyone can and should contribute to the **What** of feedback. Having various UX specialists can accent the team and help ensure that every angle is considered. Devs should also practice empathy and pass things they find helpful when debugging.

[Back to top](#gfcia-study-in-feedback)

## When

In considering when to give feedback, the answer isn't so easy as "always." It doesn't always benefit the user to have
extra information. CLI commands have `--verbose` for a reason: more isn't always better.

Yet _some_ feedback is usually good. Here's a guideline. Send feedback any time that:

- The user interacts directly with the UI.
- The server sends something to the UI.
- The server and the UI are out of sync or working on something (loading, errors)

> TL;DR Just check the list 😊

[Back to top](#gfcia-study-in-feedback)

## Where

Where feedback is placed is almost as important as what feedback is given. As an example, it wouldn't make sense for the GFCI
to have that tactile resistance when plugging something into the outlet if everything works fine. Similarly, it wouldn't make
sense to give feedback that doesn't match the situation, like having the status indicator light glow red when the circuit
works just fine.

But again, feedback often should include copy that gives the state of the situation and/or instructions to the user. And
there's a place for that information to live. This is part of where modals, alerts, and confirmation dialogs find their
strength. They grab the user's attention and present information that has a higher chance of creating conversion
on whatever action the user should take at that point. So prominent placement of this text is crucial for making sure
the user knows what to do and where they are.

> TL;DR Feedback should live in the interactive elements, in modals, and in places where users should actually see it or experience it. Again, don't forget to use tactile and audio feedback where it makes sense or could improve the experience!

[Back to top](#gfcia-study-in-feedback)

## Why

Feedback is important because it's one of the main ways (or the only way, in GUI-less interfaces) that we who create
products and systems send information to our users and continue the conversation. Done well, feedback feels seamless
and facilitates a delightful, friendly conversation that leads to a great long-term relationship. Done poorly, it
can alienate users, ensure drop off, and raise customer support costs.

Some links that helped me in writing and thinking through this are below. If I could summarize the whole "Why" in
one small phrase, it would be this:  
**We want to treat our users to the kind of experience we desire for an app. We want to improve their lives. Feedback**
**is a primary mechanism accomplishing for that goal.**

### Links

- [The Human Body as Touchscreen Replacement](https://www.nngroup.com/articles/human-body-touch-input/)
- [Fitt's Law](https://lawsofux.com/fittss-law/)
- [Jakob's Law](https://lawsofux.com/jakobs-law/) (special note on this one, I apply this specific Law to physical products, as Don Norman does in _The Design of Everyday Things_).

> TL;DR Do some reading and remember the goal. All of our products should serve to improve the lives of other humans.
