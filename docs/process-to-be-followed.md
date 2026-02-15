# Vibe Coding Policy V2

**Policy ID:** `vibe-coding-v2`\
**Version:** `2.0`\
**Intent:** Production-grade autonomous software delivery\
**Role:** Autonomous Staff-Level Software Engineer & Release Manager

---

## Introduction

Below is the policy which is to be treated as the workflow for all of our "Vibe Coded" projects.

Entirety of the development has to be done with the help of Vibe-Coding Tools such as OpenCode.

When we say “entirely”, we mean including planning, documentation, etc. Don’t do anything yourself, just prompt the tool and let it do everything for you.

**Notes:** 
- "Vibe Coded" projects are those which are built using the Vibe-Coding Tools.
- "Vibe-Coding Tools" are tools which are used to build "Vibe Coded" projects. i.e., in our case OpenCode.


---

## Ownership & Accountability

The Vibe-Coding Tools are used for:

- Planning
- Documentation
- Architecture Design
- Implementation
- Testing
- CI/CD
- Versioning
- Releases

**Your intervention is limited to orchestration** unless explicitly required by a gated decision.

---

## Operating Principles

- **Full Autonomy:** All work is performed inside the Vibe-Coding Tool's environment.
- **Milestone Integrity:** Every milestone must be runnable, demo-able, and fully tested.
- **Clarity over Cleverness:** Prefer explicit, maintainable solutions.
- **Junior-Readable by Default:** Assume minimal prior context.

---

## Global Technical Requirements

The project must always include:

- Git (with proper `.gitignore`)
- Docker
- Automated tests
- CI/CD workflows
- Project documentation

**VERY IMPORTANT**: If you or the Vibe-Coding Tool has to create new git repositories, ALWAYS create private , NEVER public.

---

## Repository Structure (Enforced)

```text
/src                 → Core application code
/tests               → Unit, integration, and e2e tests
/docs                → Documentation
/docs/adr            → Architecture Decision Records
/docker              → Dockerfiles and infra helpers
/scripts             → Automation and dev scripts
/.github/workflows   → CI/CD workflows
README.md
.gitignore
```

---
## Git Discipline 
- Changes should be pushed to the respective branch after the code has been written (pre-testing)
- Changes introduced due to code fixes or new features should be added and pushed to the respective branch.
- All of our code should be synced with git before moving to the next task.
- Follow Trunk-Based Development (TBD) git branching strategy.

---

## Decision Authority

### Vibe-Coding Tool May Decide Autonomously

- Internal module and folder structure
- Test framework selection
- CI/CD implementation details
- Minor dependencies

### You Must Escalate Before Proceeding With

- Primary tech stack or runtime changes
- Introduction of paid services
- Irreversible architectural changes
- Handling or storing sensitive user data

---

## Phase 1 — Prerequisite Documentation

This phase **must be completed before production code**.

### Required Outputs

#### 1. Non-Technical Project Summary

Must include:

- Business objective
- Problem statement
- Target users
- Success metrics

#### 2. Technical Roadmap

- Milestones required (POC → MVP → Target maturity)
- Each milestone must define:
  - Scope
  - Goals
  - Functional requirements
  - Non-functional requirements
  - Automated tests for sign-off
  - Deployment & demo expectations

#### 3. Architecture Artifacts

- `/docs/architecture.md`
- Component diagram
- Data flow diagram
- ADRs in `/docs/adr/`

---

## Milestone Execution Rules

For every milestone:

- Scope isolation is **strict**
- Output must be **deployable and demo-able**
- Mandatory updates:
  - Automated tests
  - Docker configuration
  - Documentation
  - `README.md`

---

## Milestone Definition of Done (DoD)

A milestone is complete **only if**:

- All scoped features are implemented
- All automated tests pass
- Docker run is verified
- `README.md` is updated
- Version number is incremented
- Demo scenario exists (`/docs/demo.md`)

---

## Testing Policy

Automated tests must cover:

- Happy paths
- Invalid inputs
- Failure modes
- Regression cases

Tests are enforced via CI and must reflect **real-world misuse**.

---

## Observability Policy

From **Milestone 1 onward**:

- Structured logging is required
- Errors must include context
- Logs must be accessible in Docker runs

---

## Regression Protection

Any released functionality:

- Must have automated test coverage
- Cannot be altered or removed without:
  - Updated tests
  - Updated documentation
  - Version bump justification

---

## Versioning Policy

- Standard: **Semantic Versioning**
- Rules:
  - Patch → Bug fixes, refactors
  - Minor → Backward-compatible features
  - Major → Breaking changes

**Enforcement:**

- Feature work requires a version bump
- CI fails if version is unchanged
- Version bump must be justified in release notes

---

## CI Policy

CI must run on:

- Pull requests
- Main branch pushes

CI requirements:

- Run all tests (current + previous milestones)
- Enforce 100% pass rate
- Linting and formatting checks
- Build validation
- Version validation
- Comparison with previous release where possible

---

## CD & Release Policy

### Release Conditions

- Version must be greater than last released version

### Release Channels

- **Releases:** Applications and builds
- **Packages:** Libraries
- **Deployments:** Deployed services

### Tagging Rules

- Main branch → `stable`
- Non-main branches → `canary`, `experimental`, etc

### Release Notes Must Include

- Change log
- CI test report links
- Milestone reference

---

## README Policy

`README.md` must always document (at least):

- Project overview
- Local setup
- Docker usage
- Testing instructions
- CI/CD overview
- Release and deployment process

---

## Pre-Release Self-Audit

Before any release, generate a report covering:

- Summary of changes
- Known risks
- Intentional gaps
- Recommendations for next milestone

---

## Final Directive

The Vibe-Coding Tool must behave as:

- Repository owner
- Production-ready engineer
- Stakeholder-facing deliverer

### Execution Start

1. Generate prerequisite documentation
2. Propose milestone roadmap

### Pause Condition

- A gated decision is required

---

## 📌 Policy Status

**Status:** Active
**Applies to:** All Vibe Coding projects
**Supersedes:** V1