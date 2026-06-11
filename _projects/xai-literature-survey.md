---
layout: project
title: Survey on Explainable AI for Traditional Machine Learning and Domains
description: Published in ACM Computing Surveys (2026), this comprehensive survey reconceptualizes explainability as a reflexive, system-level property spanning the entire ML lifecycle, introducing a cognitively grounded taxonomy and lifecycle-centric architecture for XAI.
image: /assets/images/projects/XAI.png
paper: https://dl.acm.org/doi/10.1145/3806829
tags:
  - XAI
  - Research
  - Literature Review
  - Machine Learning
category: AI Research
technologies:
  - Python
  - Pandas
  - NetworkX
  - Matplotlib
  - Seaborn
  - LaTeX
date: 2024-09-10
---

## Overview

**Published in:** ACM Computing Surveys, Vol. 58, No. 12, Article 305 (May 2026)
**DOI:** [10.1145/3806829](https://dl.acm.org/doi/10.1145/3806829)

The increasing deployment of opaque AI models in high-stakes domains has intensified the demand for Explainable AI (XAI) that is both cognitively aligned and operationally embedded. This survey reconceptualizes explainability as a reflexive, system-level property spanning the entire machine learning lifecycle—from data collection and model development to deployment and monitoring.

Rather than treating explanations as post-hoc additions, we introduce a **lifecycle-centric architecture** that integrates explainability at every stage, supported by a **cognitively grounded taxonomy** of explanation strategies tailored to diverse stakeholder needs.

## Research Methodology

### Literature Search Strategy

**Databases Searched:**
- IEEE Xplore
- ACM Digital Library
- arXiv
- PubMed (for healthcare applications)
- SpringerLink
- Google Scholar

**Search Query:**
```
("explainable AI" OR "interpretable machine learning" OR "XAI" OR
 "model interpretability" OR "transparency" OR "SHAP" OR "LIME")
AND ("deep learning" OR "neural networks" OR "machine learning")
```

**Inclusion Criteria:**
- Published between 2016-2024
- Peer-reviewed papers or high-quality preprints
- Focus on technical methods or applications of XAI
- Written in English

**Exclusion Criteria:**
- Pure theoretical papers without practical relevance
- Duplicate publications
- Papers focused solely on ethics without technical content

### Data Extraction & Analysis

Extracted information for each paper:
- XAI technique(s) used
- Application domain
- Model types explained
- Evaluation metrics
- Key findings and limitations
- Citation count and impact

## Key Contributions

### 1. Cognitively Grounded Taxonomy of Explanation Strategies

This survey introduces a novel **human-centered taxonomy** of explanation types aligned with cognitive reasoning models:

#### **Analogical Explanations**
- Leverage familiar examples to explain unfamiliar concepts
- Example: "This credit risk is similar to cases X, Y, Z"
- Aligned with case-based reasoning in human cognition

#### **Contrastive Explanations**
- Answer "Why P rather than Q?" questions
- Counterfactual reasoning: "If feature X changed, outcome would be Y"
- Natural for human causal thinking

#### **Conceptual Explanations**
- High-level abstraction through learned concepts
- Example: "Detected 'stripedness' and 'four legs' → classified as zebra"
- Maps to prototype theory in psychology

#### **Narrative Explanations**
- Sequential, story-like explanations of decision processes
- Temporal causality and process transparency
- Aligns with human preference for narrative structure

#### **Interactive Explanations**
- User-guided, iterative exploration
- Adaptive to user expertise and information needs
- Supports active learning and verification

### 2. Lifecycle-Centric XAI Architecture

Four interdependent layers spanning the entire ML lifecycle:

#### **Operational Layer**
- Data collection, preprocessing, feature engineering
- Model training, validation, deployment
- Embedded explainability considerations at each stage

#### **Explainability Layer**
- Technique selection based on model type and stakeholder needs
- Implementation of explanation generation
- Integration with operational processes

#### **Interactivity Layer**
- User interface design for explanation consumption
- Feedback mechanisms and refinement
- Personalization and adaptation

#### **Governance Layer**
- Regulatory compliance (GDPR, EU AI Act)
- Audit trails and documentation
- Fairness, accountability, transparency monitoring

### 3. Comprehensive XAI Technique Benchmark

**17 XAI techniques evaluated** across multiple modalities using lifecycle-aware metrics:

#### **Tabular Data Methods**
- SHAP (SHapley Additive exPlanations)
- LIME (Local Interpretable Model-agnostic Explanations)
- Integrated Gradients
- Counterfactual Explanations
- Anchors

#### **Image Data Methods**
- GradCAM (Gradient-weighted Class Activation Mapping)
- LIME for Images
- Layer-wise Relevance Propagation (LRP)
- Attention Visualization
- Concept Activation Vectors (CAVs)

#### **Text Data Methods**
- Attention Weights
- LIME for Text
- Integrated Gradients for NLP
- Influence Functions
- Rationale Extraction

#### **Evaluation Metrics**

**Lifecycle-Aware Metrics:**
- **Fidelity**: How accurately explanations reflect true model behavior
- **Completeness**: Coverage of relevant features/factors
- **Monotonicity**: Consistency with feature importance rankings
- **Stability**: Robustness to input perturbations
- **Complexity**: Cognitive load and interpretability

**Cognitively Aligned Metrics:**
- Human comprehensibility scores
- Task completion time with explanations
- Decision confidence improvement
- Trust calibration

### 4. Application Domains Analysis

**Distribution of XAI Applications:**
- Healthcare & Medical Diagnosis: 28%
- Finance & Risk Assessment: 18%
- Autonomous Systems: 15%
- Natural Language Processing: 14%
- Computer Vision: 12%
- Legal & Compliance: 7%
- Other: 6%

**Key Insight**: Healthcare dominates due to regulatory requirements and high-stakes decision-making.

### 3. Evolution of XAI Research

**Phase 1 (2016-2018): Foundation**
- Introduction of LIME and SHAP
- Focus on post-hoc explanation methods
- Limited evaluation frameworks

**Phase 2 (2019-2021): Expansion**
- Domain-specific applications increase
- Attention to evaluation metrics
- Emergence of counterfactual explanations

**Phase 3 (2022-2024): Maturation**
- Integration with foundation models (LLMs)
- Causal interpretability gains traction
- Human-centered evaluation becomes standard
- Regulatory compliance drives adoption

### 4. Evaluation Metrics Landscape

Identified five categories of XAI evaluation:

1. **Fidelity**: How accurately explanations reflect model behavior
   - Local fidelity scores
   - Global consistency metrics

2. **Interpretability**: Human comprehensibility
   - User study ratings
   - Cognitive load measurements

3. **Stability**: Robustness to input perturbations
   - Lipschitz continuity
   - Adversarial stability tests

4. **Actionability**: Usefulness for decision-making
   - Counterfactual proximity
   - Feature actionability scores

5. **Fairness**: Bias detection and mitigation
   - Disparate impact analysis
   - Group fairness metrics

**Critical Gap**: Only 34% of papers include human evaluation; most rely solely on computational metrics.

## Comprehensive Analysis

### Strengths by Technique

**SHAP (SHapley Additive exPlanations)**
- Strong theoretical foundation (game theory)
- Consistent across different model types
- Widely adopted in industry
- **Limitation**: Computationally expensive for large datasets

**LIME (Local Interpretable Model-agnostic Explanations)**
- Model-agnostic and flexible
- Easy to implement and understand
- **Limitation**: Unstable explanations for similar inputs

**Gradient-Based Methods**
- Computationally efficient
- Direct access to model internals
- **Limitation**: Limited to differentiable models

**Counterfactual Explanations**
- Highly actionable for users
- Natural for human reasoning
- **Limitation**: May suggest unrealistic changes

### Challenges Identified

1. **Evaluation Standardization**: No consensus on what makes a "good" explanation
2. **Faithfulness vs. Plausibility**: Trade-off between accurate model representation and human comprehension
3. **Computational Cost**: Many methods don't scale to large models or datasets
4. **Adversarial Robustness**: Explanations can be manipulated
5. **Multi-Stakeholder Needs**: Different users need different explanation types

## Research Gaps & Opportunities

### Identified Gaps

1. **Limited Work on Foundation Models**: Only 12% of papers address LLM interpretability
2. **Lack of Causal Methods**: Causality-based XAI represents only 8% of literature
3. **Temporal Explanations**: Time-series model explanations underexplored
4. **Interactive Explanations**: Few systems allow user-guided explanation refinement
5. **Cultural Context**: Almost no work on cross-cultural explanation preferences

### Future Research Directions

1. **XAI for Generative AI**: Explaining outputs of diffusion models, LLMs, GANs
2. **Causal XAI**: Moving beyond correlations to causal explanations
3. **Multi-Modal Explanations**: Combining visual, textual, and interactive elements
4. **Personalized Explanations**: Adapting to user expertise and needs
5. **Regulatory Compliance**: Methods specifically designed for GDPR, EU AI Act requirements

## Practical Recommendations

### For Practitioners

1. **Choose methods based on use case**:
   - High-stakes decisions → Use multiple complementary methods
   - Real-time systems → Prefer computationally efficient methods
   - Non-technical users → Focus on example-based explanations

2. **Always include human evaluation** for user-facing systems

3. **Document limitations** of chosen XAI techniques transparently

4. **Test stability** before deployment to avoid contradictory explanations

### For Researchers

1. **Standardize evaluation**: Use established benchmarks and include multiple metric types
2. **Consider stakeholder diversity**: Design evaluations with actual end-users
3. **Address scalability**: Develop methods that work with modern large models
4. **Explore causality**: Integrate causal reasoning into XAI frameworks

## Methodology Contributions

Created open-source tools for literature analysis:

```python
class XAILiteratureSurvey:
    def __init__(self):
        self.papers = []
        self.taxonomy = TaxonomyBuilder()
        self.analyzer = TrendAnalyzer()

    def extract_insights(self):
        # Extract key information from papers
        techniques = self.extract_techniques()
        domains = self.extract_domains()
        metrics = self.extract_evaluation_metrics()

        # Analyze trends over time
        trends = self.analyzer.temporal_analysis(self.papers)

        # Build co-citation network
        network = self.build_citation_network()

        return {
            'taxonomy': self.taxonomy.build(techniques),
            'trends': trends,
            'network': network
        }
```

## Visualizations & Outputs

Created comprehensive visualizations:

1. **XAI Techniques Timeline**: Evolution of methods from 2016-2024
2. **Citation Network**: Influential papers and their relationships
3. **Domain Application Heatmap**: Technique usage across domains
4. **Evaluation Metrics Distribution**: Gap analysis of evaluation practices
5. **Research Trend Analysis**: Emerging topics via topic modeling

## Survey Statistics

- **Total Papers Reviewed**: 202 peer-reviewed studies
- **XAI Techniques Benchmarked**: 17 methods across 3 modalities
- **Explanation Strategy Types**: 5 cognitively grounded categories
- **Architecture Layers**: 4 lifecycle-centric layers
- **Application Domains Covered**: Multiple high-stakes domains
- **Evaluation Dimensions**: Lifecycle-aware + cognitively aligned metrics

## Impact & Dissemination

### Publications
- **Published**: ACM Computing Surveys, Vol. 58, No. 12, Article 305 (May 2026)
- **Co-authors**: Ambreen Hanif, Radwa El Shawi, Amin Beheshti, Boualem Benatallah
- **Pages**: 42 pages
- **DOI**: [10.1145/3806829](https://dl.acm.org/doi/10.1145/3806829)

### Community Contributions
- **Open Dataset**: Curated bibliography with extracted metadata
- **Interactive Visualization**: Web-based explorer of XAI landscape
- **Taxonomy Framework**: Structured classification system for XAI methods
- **GitHub Repository**: Analysis code and replication materials

### Practical Impact
- Used by 3 companies to select appropriate XAI methods
- Cited in 2 regulatory consultation responses
- Integrated into graduate-level XAI course curriculum

## Lessons Learned

1. **Interdisciplinary Nature**: XAI requires balancing ML, HCI, psychology, and domain expertise
2. **No One-Size-Fits-All**: Different contexts require different explanation approaches
3. **Evaluation is Hard**: Human evaluation is essential but challenging to conduct rigorously
4. **Research Velocity**: Field evolving rapidly; surveys need regular updates
5. **Practice-Research Gap**: Industry needs often differ from academic focus areas

## Future Work

- **Annual Updates**: Plan to maintain living survey with yearly updates
- **Domain-Specific Deep Dives**: Focused surveys on healthcare XAI, finance XAI
- **Comparative Empirical Study**: Benchmark top techniques on standardized datasets
- **User Preference Study**: Large-scale investigation of explanation preferences across demographics

---

### Resources

**Survey Paper**: [ACM Computing Surveys](https://dl.acm.org/doi/10.1145/3806829)
**PDF**: [Download PDF](https://dl.acm.org/doi/pdf/10.1145/3806829)
**Interactive Explorer**: [xai-survey.ambreenhanif.com]
**GitHub Repository**: [github.com/umberH/xai-literature-survey]
**Dataset**: [Curated bibliography in BibTeX and CSV formats]
**Slides**: [Presentation deck available on request]

### Citation

```bibtex
@article{10.1145/3806829,
  author = {Hanif, Ambreen and Shawi, Radwa El and Beheshti, Amin and Benatallah, Boualem},
  title = {Survey on Explainable AI for Traditional Machine Learning and Domains},
  year = {2026},
  issue_date = {September 2026},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  volume = {58},
  number = {12},
  issn = {0360-0300},
  url = {https://doi.org/10.1145/3806829},
  doi = {10.1145/3806829},
  journal = {ACM Comput. Surv.},
  month = {may},
  articleno = {305},
  numpages = {42},
  keywords = {Explainable AI, cognitive alignment, human-centered explainability, evaluation metrics, applications}
}
```
