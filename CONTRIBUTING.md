# Contributing to FixMyBerlin

FixMyBerlin is an open source project and we would love to receive contributions.
If you want to contribute – welcome! Great that you are here!

The project is mostly being developed by FixMyCity GmbH in Berlin. We
are working on the platform continuously and see each other face-to-face every week in the [co-working area of the city of Berlin](https://www.citylab-berlin.org/), which contributes a lot to our collaboration during development. Nonetheless we want to make it easy to contribute to this project from outside the
organisation as well. This document tries to answer some common questions that you might have
if you would like to do so. If you have any questions or comments, feel free to open an issue at [Github](https://github.com/FixMyBerlin/fixmy.frontend/issues/new) or send a short email to [feedback@fixmycity.de](mailto:feedback@fixmycity.de).

## Table of Contents

- [What should I know before I get started?](#what-should-i-know-before-i-get-started-)
  - [Split repositories](#split-repositories)
  - [Issues](#issues)
    - [All in one place](#all-in-one-place)
    - [Labeling](#labeling)
- [How can I get start developing?](#how-can-i-get-start-developing-)
- [How Can I start contributing?](#how-can-i-start-contributing-)
  - [Reporting bugs](#reporting-bugs)
  - [Picking an open issue from the back log](#picking-an-open-issue-from-the-back-log)
  - [Requesting a feature](#requesting-a-feature)
  - [Opening a pull Request](#opening-a-pull-request)
- [Contacts](#contacts)
- [Additional notes](#additional-notes)
  - [Why are some issues in German and/or lacking a detailed explanation?](#why-are-some-issues-in-german-and-or-lacking-a-detailed-explanation-)

## What should I know before I get started?

### Split repositories

The code running [fixmyberlin.de](https://fixmyberlin.de/) is contained in two repositories,
published by the [FixMyBerlin GitHub organisation](https://github.com/FixMyBerlin):

| Repository                                                       | Purpose                                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [/fixmy.platform](https://github.com/FixMyBerlin/fixmy.platform) | Backend for all services and projects we provide. A Django-based Python app. |
| [/fixmy.frontend](https://github.com/FixMyBerlin/fixmy.frontend) | Web frontend that runs fixmyberlin.de. A React-based Javascript app.         |

Your contribution might affect both repositories.

### Issues

We use issues to track both bugs and tasks. Some of the issue's title and description might seem cryptic because the people working on it are already deep into the matter, however if you are curious - feel free to add your question as a comment or just ask for a general explanation and we will probably be happy to explain in more detail.

#### Labeling

We are using [GitHub's default labels](https://help.github.com/en/github/managing-your-work-on-github/about-labels#using-default-labels) so look out for issues labeled [_good first issue_](https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3AFixMyBerlin+label%3A%22good+first+issue%22) or [_help wanted_](https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3AFixMyBerlin+label%3A%22help+wanted%22) as these are good starting points for jumping into the code.

## How can I get start developing?

The [README.md](README.md) explains how to
run the app locally by spawing a development server and how to run our test suite. If you run into any issues doing so, do not hesitate to open an issue with a description of your problem, we might be able to help.

## How Can I start contributing?

### Reporting Bugs

Spotted a bug? Please raise an issue using [the provided issue template](https://github.com/FixMyBerlin/fixmy.frontend/issues/new/choose).
Make sure to explain the problem with enough details to help maintainers to reproduce the problem.

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps that reproduce the problem** in as many details as possible.
  - Start by explaining how you ran the app. Did you visit https://fixmyberlin.de/? Did you run a local dev server?
  - State the the URL where you encountered the bug, e.g. [/planungen](https://fixmyberlin.de/planungen)?
  - What did you to to provoke the error? Provide specific examples to demonstrate the steps.
    Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
    If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and demonstrate the problem.
  You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.

### Picking an open issue from the back log

If the issue description is not clear enough, ask questions by commenting below it.
You can spot suitable issues by their [labels](#labeling).

### Requesting a feature

You have an idea for an improvement to the app? Great!

Please contact us to discuss your idea. Try and make it easy for us to understand your idea. Does your idea add value for a specific kind of user of our app? How do you imagine it to work and look like? Maybe also: How could it be implemented? You don't need to have a solution ready, though.

### Opening a Pull Request

We love PRs! Before you get to work developing an enormous feature, please get in touch and talk to us, though.

Here is a quick guide for how you make a pull request:

- Fork the repo
- Write new code
- Make sure all tests pass
- Commit your changes. When writing the message, follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec.
- Push to your fork and submit a pull request.
- Within the PR, describe the requested change using the provided pull request template.

## Additional Notes

#### Why are some issues in German and/or lacking a detailed explanation?

FixMyBerlin is developed by a team of developers who regularly talk to each other and plan development in German language. Translating all of our plans into English would create a lot of friction and many chances for miscommunication.

Since tasks are often also discussed in person in our office, in video calls or defined in external documents, we don't always add full documentation to the descriptions of our tickets. Instead we often use tickets to record the progress of tasks well-known.

However, we are trying to explicitly create points of entry for anyone interested in joining in on the development of the project. Please refer to the [section about labeling](#labeling)) to find well-documented examples of good first issues.
