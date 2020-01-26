# Contributing to FixMyBerlin

FixMyBerlin is an OpenSource project and we would love to receive contributions. 
If want to contribute – Welcome! Great that you are here!

## Table of Contents

- [What should I know before I get started?](#what-should-i-know-before-i-get-started-)
  * [platform and frontend](#platform-and-frontend)
  * [Issues](#issues)
    + [All in one place](#all-in-one-place)
    + [Labeling](#labeling)
- [How can I get start developing?](#how-can-i-get-start-developing-)
- [How Can I start contributing?](#how-can-i-start-contributing-)
  * [Reporting Bugs](#reporting-bugs)
  * [Picking an open issue from the back log](#picking-an-open-issue-from-the-back-log)
  * [Requesting a feature](#requesting-a-feature)
  * [Opening a Pull Request](#opening-a-pull-request)
- [Contacts](#contacts)
- [Additional Notes](#additional-notes)
    + [Why are some issues in german and/or lacking a detailed explanation?](#why-are-some-issues-in-german-and-or-lacking-a-detailed-explanation-)

___________________________

## What should I know before I get started?

### platform and frontend

The code behind (FixMyBerlin Web App)[https://fixmyberlin.de/] is split into two main repositories, 
bundled under the [FixMyBerlin GitHub Group](https://github.com/FixMyBerlin):

| Repo      | Purpose                                                                                         |
|---------------|-------------------------------------------------------------------------------------------------|
| [/fixmy.platform](https://github.com/FixMyBerlin/fixmy.platform) | A [Django](https://www.djangoproject.com)-based API  |
| [/fixmy.frontend](https://github.com/FixMyBerlin/fixmy.frontend) | A [React](https://reactjs.org)-based web application  |

A contribution might affect both repositories.

### Issues

Tasks and their progress are tracked in issues. 

#### All in one place

We decided to keep all Issues in [/fixmy.platform](https://github.com/FixMyBerlin/fixmy.platform). 
If you want to open up an an issue regarding the frontend or/and the back end, please do it here.

#### Labeling 

We are using [GitHubs default labels](https://help.github.com/en/github/managing-your-work-on-github/about-labels#using-default-labels).

So Issues explicitly suitable for external contributions are labeled as
* *good first issue* (only a couple of lines of code are needed) or as 
* *help wanted*

## How can I get start developing?

The [README.md](README.md) explains how to
run the app locally by spawing a development server
build
run tests

## How Can I start contributing?

### Reporting Bugs

Spotted a bug? Please 

open up an issue in [/fixmy.platform](https://github.com/FixMyBerlin/fixmy.platform).
explain the problem using the provided issue template and include additional details to help maintainers to reproduce the problem 
- [ ] Issue template file Link Issue Template

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. E.g.
  * start by explaining how you ran the app. Did you visit https://fixmyberlin.de/? Did you run a local dev server? 
  * state the the route you encountered the bug, e.g. [/planungen](https://fixmyberlin.de/planungen)? 
  * What did you to to provoke the error? Provide specific examples to demonstrate the steps**. 
  Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. 
  If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. 
    You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.

### Picking an open issue from the back log

If the issue description is not clear enough, ask questions by commenting below it.

### Requesting a feature

You have an idea about how the app can be extended? Great! Please

Please [contact](#contacts) us to discuss your idea.
Provide a clear and detailed explanation of the feature you want to add. What value would it add? How would it work/look like? Maybe also: How could it be implemented?

### Opening a Pull Request

We love PRs. Here is a quick guide how it works:
Fork the repo
Write new code
Make sure all tests pass
Commit your changes. When writing the message, follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec.
Push to your fork and submit a pull request. Describe the requested change using the provided pull request template.


## Contacts

If you have any comments or suggestions please send a mail to [feedback@fixmycity.de](mailto:feedback@fixmycity.de)

- [ ] Can we link to an open Slack channel designated for coordination with contributors?

## Additional Notes

#### Why are some issues in german and/or lacking a detailed explanation?

FixMyBerlin is driven by [project funding](https://prototypefund.de/project/fixmyberlin/). Up to now, most contributors have been hired. User stories fostered with project money are developed of a [small team](https://fixmyberlin.de/info) that regularly talks to each other - in german. Since the tasks are discussed and managed in other places, the issues are mainly used to give changes done in commits and PRs a bit of context – not to elaborate the task.

Now that we explicitly open up suitable issues to public contributors, these issues are going to be
in english
detailed
labeled, checkour our [labeling policy]((#labeling))




