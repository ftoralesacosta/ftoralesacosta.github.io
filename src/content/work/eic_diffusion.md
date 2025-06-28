---
title: Diffusion for Complete Generation of Collider Events
publishDate: 2020-03-02 00:00:00
img: /assets/eic_diffusion.png
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  We designed a whodunnit-style game to introduce Markdown formatting. Suspense — suspicion — syntax!
tags:
  - Diffusion
  - Point Clouds
  - Transformers
---

---
#### [Full Paper Link](https://arxiv.org/pdf/2410.22421v2)




### Synopsis

Collider data is very rich, comprising a high-dimensional dataset. The data can
be broken down into two categories: event-level and particle-level. Event-level
data describes the primary interaction between an electron and a parton (a
quark or gluon). This is high-level information that describes the collision as
a whole. Particle-level data includes all the particles produced from the
high-energy collision. This consists of a large number of particles (mostly
mesons) that we can measure in our detectors, and each particle has features
like momentum, charge, and position.

We take advantage of this factored data structure by training two diffusion
models: one for event-level data and one for particle-level data. The
event-level model generates event-level data, such as the total number of
particles in the event and the amount of energy transferred from the electron
to the proton in the collision. It then passes this data to the particle-level
model, which generates all the particles in the event described by the previous
model. This allows for whole-event, end-to-end generation.


-----
### Abstract

At high-energy collider experiments, generative models can be used for a wide range of tasks, including fast detector simulations, unfolding, searches of physics beyond the Standard Model, and inference tasks. In particular, it has been demonstrated that score-based diffusion models can generate high-fidelity and accurate samples of jets or collider events. This work expands on previous generative models in three distinct ways. First, our model is trained to generate entire collider events, including all particle species with complete kinematic information. We quantify how well the model learns event-wide constraints such as the conservation of momentum and discrete quantum numbers. We focus on the events at the future Electron-Ion Collider, but we expect that our results can be extended to proton-proton and heavy-ion collisions. Second, previous generative models often relied on image-based techniques. The sparsity of the data can negatively affect the fidelity and sampling time of the model. We address these issues using point clouds and a novel architecture combining edge creation with transformer modules called Point Edge Transformers. Third, we adapt the foundation model OmniLearn, to generate full collider events. This approach may indicate a transition toward adapting and fine-tuning foundation models for downstream tasks instead of training new models from scratch.

### Introduction

High-energy collider experiments offer unique opportunities to probe the internal dynamics of protons and nuclei, study emergent phenomena such as hadronization, and search for physics beyond the Standard Model of particle physics. By analyzing the particles observed in detectors centered around the scattering vertex, it is possible to infer the dynamics of particles at subatomic scales.

The next-generation experiment will be the future Electron-Ion Collider (EIC) [^1], where high-luminosity electron-proton/nucleus scattering will be studied at center-of-mass (CM) energies up to √(s)=140 GeV. Analyzing vast amounts of recorded collider data is a challenging task where machine learning tools are expected to have a significant impact on the experimental and theoretical workflows. Example applications include detector design, inference tasks, searches of BSM physics, fast detector simulations, jet classification, and unfolding. Similar considerations apply to proton-proton and heavy-ion collisions at RHIC and the LHC. For recent results, see Refs. [^2] and references therein.

Some of the key tools to advance different areas of collider phenomenology are generative models that can be trained to generate full collider events. Various architectures have been trained in the past to generate collider events or jets including GANs [^3], variational autoencoders [^4], normalizing flows [^5] and score-based diffusion models [^6]. In particular, diffusion models have been demonstrated to produce high-fidelity samples. While the sampling time is typically relatively slow compared to GANs, it has been improved significantly using techniques such as distillation [^7].

Score-based diffusion models learn an approximation of the score function or the gradients of the logarithm of the data probability. This approximation is then used during sampling to transform a simple distribution, such as a Gaussian distribution, into complex collider data. In Ref. [^8], a first diffusion-based model was developed for EIC events based on pixelated images. Since > 99% of the pixels are empty and the distributions of different observables can fall steeply toward their kinematic endpoints, a suitable remapping of the input variables was required. Due to its relevance in Deep Inelastic Scattering (DIS), the modeling of the scattered electron kinematics plays a critical role in electron-proton collisions that requires special attention. See also Ref. [^9] where an image-based diffusion model was developed for heavy-ion collisions.

In this work, we extend previous results by developing a point cloud-based diffusion model for EIC events. By using point clouds and a novel architecture that combines edge creation with transformer modules, termed Point Edge Transformers (PET), we achieve significant improvements compared to the diffusion model of Ref. [^8]. In particular, we focus on success metrics such as the shape of different kinematic distributions as well as the event-wide conservation of momentum and discrete quantum numbers. We adapt the pre-existing foundation model OmniLearn [^10] to generate full EIC events. OmniLearn was initially developed for both classification and generation tasks in the context of jet physics at the LHC. To generate EIC events, including full Particle IDentification (PID), we use a two-step generation process. As a first step, the scattered electron kinematics are generated. Second, the remaining particles in the event are conditioned on the electron kinematics. We expect similar multi-step generative processes may also improve the generation of full events in different collision systems. While we train the model developed here from scratch instead of fine-tuning the foundation model, our approach is closely related to OmniLearn. Our results may, therefore, point toward a transition toward adapting foundation models for different downstream tasks at collider experiments.

The remainder of this paper is organized as follows. In section II, we describe the score-based diffusion model for EIC events developed in this work employing a point cloud data representation and the PET architecture. In section III, we consider several metrics to evaluate the performance of the diffusion model. We consider different particle distributions and observables as well as event-wide constraints such as momentum and baryon number conservation. We conclude and present an outlook in section IV.

[^1]: R. Abdul Khalek et al., "Science Requirements and Detector Concepts for the Electron-Ion Collider: EIC Yellow Report," [arXiv: 2103.05419 \[physics.ins-det\]](http://arxiv.org/abs/2103.05419).
[^2]: See Refs. [2-32] in the full document and references therein.
[^3]: See Refs. [34-38] in the full document.
[^4]: See Ref. [39] in the full document.
[^5]: See Refs. [40, 41] in the full document.
[^6]: See Refs. [38, 42-51] in the full document.
[^7]: See Refs. [44, 52] in the full document.
[^8]: P. Devlin, J.-W. Qiu, F. Ringer, and N. Sato, "Diffusion model approach to simulating electron-proton scattering events," Phys. Rev. D 110 no. 1, (2024) 016030, arXiv: [2310.16308 \[hep-ph\]](http://arxiv.org/abs/2310.16308).
[^9]: Y. Go, D. Torbunov, T. Rinn, Y. Huang, H. Yu, B. Viren, M. Lin, Y. Ren, and J. Huang, "Effectiveness of denoising diffusion probabilistic models for fast and high-fidelity whole-event simulation in high-energy heavy-ion experiments," [arXiv: 2406.01602 \[physics.data-an\]](http://arxiv.org/abs/2406.01602).
[^10]: V. Mikuni and B. Nachman, "OmniLearn: A Method to Simultaneously Facilitate All Jet Physics Tasks," arXiv: 2404.16091 [hep-ph].]
