---
title: Introduction to AI speech concepts
order: 4
categories: nlp
---

# Introduction to AI speech concepts

## Overview

Speech is one of the most natural ways humans communicate — adding speech
capabilities to AI applications creates more **intuitive, accessible, and
engaging** user experiences. It's relevant whether building voice assistants,
accessible applications, or conversational AI agents.

**The two fundamental capabilities:**

1. **Speech recognition** — converting spoken words to text.
2. **Speech synthesis** — converting text to natural-sounding speech.

Together they enable seamless voice interactions.

## Speech-enabled solutions

### The two capabilities, recapped

- **Speech recognition (speech-to-text)** — listens to audio input and
  transcribes it into written text.
- **Speech synthesis (text-to-speech)** — converts written text into spoken audio.

Together they enable **hands-free operation, accessibility, and natural
conversational experiences**.

### Why integrate speech — the four benefits

1. **Expand accessibility** — serve users with visual impairments or mobility
   challenges.
2. **Increase productivity** — enable multitasking, no keyboards/screens needed.
3. **Enhance user experience** — natural, human-feeling conversations.
4. **Reach global audiences** — multiple languages and regional dialects.

### Speech recognition scenarios (speech-to-text)

| Domain | Uses |
| --- | --- |
| **Customer service** | Real-time call transcription for agents/QA; routing callers by what they say; sentiment analysis of calls; searchable records for compliance and training. |
| **Voice assistants & agents** | Voice commands, hands-free control; answering questions; tasks (reminders, messages, search); smart home, automotive, wearables. |
| **Meeting/interview transcription** | Searchable notes and action items; real-time captions for deaf/hard-of-hearing participants; summaries of interviews and research sessions. |
| **Healthcare documentation** | Dictating patient notes into electronic health records; updating treatment plans without interrupting care; reducing admin burden and burnout. |

### Speech synthesis scenarios (text-to-speech)

| Domain | Uses |
| --- | --- |
| **Conversational AI / chatbots** | Natural-sounding voice responses; adjusting tone/pace/style; voice channels like phone systems. |
| **Accessibility & content consumption** | Reading content aloud for visual impairments; supporting dyslexia; listening while driving/exercising. |
| **Notifications & alerts** | Announcing alerts and reminders; GPS navigation instructions; hands-free critical info; industrial status updates. |
| **E-learning** | Narrated lessons without recording studios; pronunciation examples for language learning; scaling across languages. |
| **Entertainment & media** | Game character voices; podcast/audiobook prototypes; video voiceovers. |

### Combining both — conversational experiences

- **Voice-driven customer service** — listen (recognition) → process → respond (synthesis).
- **IVR systems** — callers speak their needs, system guides through options in
  natural dialogue.
- **Language learning** — student speaks (recognition), system gives feedback (synthesis).
- **Voice-controlled vehicles** — driver commands (recognition), system confirms
  and updates (synthesis).

**Tip:** start with a **single speech capability** on your highest-value
scenario; prove it before expanding.

### Key considerations before implementing

1. **Audio quality** — background noise, microphone quality, bandwidth affect
   recognition accuracy.
2. **Language/dialect support** — verify target languages and regional variations
   are covered.
3. **Privacy & compliance** — how audio data is processed, stored, protected.
4. **Latency** — real-time conversation needs low latency; batch transcription
   tolerates delays.
5. **Accessibility standards** — meet WCAG guidelines; don't create new barriers.

> **Important:** always provide **alternative input/output methods** — some users
> prefer or require text even when speech exists.

## Speech recognition — the pipeline

Six coordinated stages — sound wave to text.

### 1. Audio capture — analog to digital

- A microphone converts sound waves into a digital signal.
- The system samples the analog audio thousands of times per second — typically
  **16,000 samples/second (16 kHz)** for speech — storing each measurement as a
  numeric value.
- **Sampling rate trade-off:** higher rates (44.1 kHz for music) capture more
  detail but cost more processing; speech recognition balances clarity and
  efficiency at **8–16 kHz**.
- Background noise, microphone quality, and speaker distance directly impact
  downstream accuracy.
- Basic filters are often applied here to remove hums, clicks, background noise.

### 2. Pre-processing — extract features (MFCC)

Raw samples contain too much information; pre-processing transforms the waveform
into a compact representation highlighting speech characteristics, discarding
irrelevancies (like absolute volume).

**MFCC (Mel-Frequency Cepstral Coefficients)** — the most common feature
extraction technique; mimics how the human ear perceives sound, emphasizing
frequencies where speech energy concentrates.

The four MFCC steps:

- **Divide audio into frames** — overlapping 20–30 ms windows.
- **Apply Fourier transform** — convert time domain → frequency domain (which
  pitches are present).
- **Map to Mel scale** — adjust frequency bins to human hearing sensitivity (we
  distinguish low pitches better than high).
- **Extract coefficients** — a small set of numbers (often **13 coefficients**)
  summarizing each frame's spectral shape.

Output: a sequence of **feature vectors, one per frame** — the input for acoustic
modeling.

### 3. Acoustic modeling — recognize phonemes

**Phonemes** = the smallest units of sound that distinguish words. English has
~44 phonemes; "cat" = /k/, /æ/, /t/.

Modern acoustic models use **transformer architectures**, which excel through:

- **Attention** — examines surrounding frames to resolve ambiguity (e.g., /t/
  sounds different at the start of "top" vs. the end of "bat").
- **Parallel processing** — analyzes multiple frames simultaneously (unlike older
  recurrent models) → faster and more accurate.
- **Contextualized predictions** — learns which phoneme sequences occur frequently.

Output: a **probability distribution over phonemes per frame** (e.g., frame 42:
80% /æ/, 15% /ɛ/).

> **Note:** phonemes are language-specific — an English-trained model can't
> recognize Mandarin tones without retraining.

### 4. Language modeling — predict word sequences

Phonemes alone aren't enough: "their" and "there" share identical phonemes. The
language model resolves ambiguity with vocabulary, grammar, and word-pattern
knowledge:

- **Statistical patterns** — "The weather is nice" appears more often than "The
  whether is nice".
- **Context awareness** — after "I need to", expect verbs, not nouns.
- **Domain adaptation** — custom language models trained on medical/legal
  terminology improve specialized accuracy.

### 5. Decoding — select the best text hypothesis

Searches millions of possible word sequences for the transcription that best
matches both acoustic and language model predictions — balancing fidelity to the
audio with readable, grammatical text.

**Beam search** — the most common technique: maintains a shortlist (the "beam")
of top-scoring partial transcriptions, extends each with the next most likely
word, and prunes low-scoring paths at every step.

**Caution:** computationally intensive — real-time applications limit beam
width/depth to balance accuracy and latency.

### 6. Post-processing — refine the output

- **Capitalization** ("hello my name is sam" → "Hello my name is Sam").
- **Punctuation restoration** — based on prosody and grammar.
- **Number formatting** ("one thousand twenty three" → "1,023").
- **Profanity filtering** — when required by policy.
- **Inverse text normalization** ("three p m" → "3 PM").
- **Confidence scoring** — flag low-confidence words for human review (critical in
  e.g. medical transcription).

Azure Speech returns the transcription plus metadata: **word-level timestamps and
confidence scores**.

**How it fits together:** capture → MFCC features → phoneme probabilities
(acoustic) → vocabulary/grammar (language) → best word sequence (decoding) →
formatted text (post-processing). Separating concerns means quality issues can be
traced to one stage and fixed there.

## Speech synthesis (TTS) — the pipeline

Four stages — text to audio waveform (the mirror image of speech recognition).

### 1. Text normalization — standardize the text

Prepares raw text for pronunciation by expanding it into spoken forms. Example:
"Dr. Smith ordered 3 items for $25.50 on 12/15/2023" → "Doctor Smith ordered
three items for twenty-five dollars and fifty cents on December fifteenth, two
thousand twenty-three."

Common tasks:

- **Expanding abbreviations** — "Dr." → "Doctor", "Inc." → "Incorporated".
- **Numbers to words** — "3" → "three".
- **Dates and times** — "12/15/2023" → "December fifteenth…".
- **Symbols** — "$" → "dollars", "@" → "at".
- **Resolving homographs by context** — "read" present vs. past tense.

Without this, the system would try to pronounce raw symbols/digits → unnatural
output. Note: different domains need specialized rules (medical drug dosages vs.
financial currency).

### 2. Linguistic analysis — map text to phonemes

Breaks normalized text into phonemes and determines pronunciation:

- Segments text into words and syllables.
- Looks up pronunciations in **lexicons** (pronunciation dictionaries).
- Applies **G2P** rules or neural models for unknown words.
- Marks syllable boundaries and stressed syllables.
- Determines phonetic context for adjacent sounds.

**Grapheme-to-phoneme (G2P) conversion** — maps written letters (graphemes) to
sounds (phonemes). English spelling is unreliable: "though" /ðoʊ/, "through"
/θruː/, "cough" /kɔːf/ — same "ough", dramatically different pronunciation.
Modern G2P uses neural networks trained on pronunciation dictionaries, handling
rare words, proper names, and regional variation better than rule-based systems.
Transformers provide context: "I read books" (/riːd/) vs. "I read that yesterday"
(/rɛd/).

### 3. Prosody generation — determine HOW to say it

**Prosody** = the rhythm, stress, and intonation that make speech sound natural —
how to say words, not just which sounds.

Elements of prosody:

- **Pitch contours** — rising vs. falling (questions vs. statements).
- **Duration** — how long each sound is held (emphasis, rhythm).
- **Intensity** — volume variations highlighting important words.
- **Pauses** — breaks aiding comprehension.
- **Stress patterns** — which syllables get emphasis.

The killer example: "**I** never said he ate the cake" vs. "I never said **he**
ate the cake" vs. "I never said he ate the **cake**" — same words, different
meanings depending on emphasis.

**Transformer-based prosody prediction:** the model receives the phoneme sequence
+ linguistic features, self-attention identifies relationships across the whole
sentence, and it outputs pitch, duration, and energy values per phoneme, adjusted
for speaking style (neutral, expressive, conversational). Learned from thousands
of hours of recorded speech + transcripts: questions rise at the end, commas
signal pauses, emphasized words lengthen.

The output is a target specification like: "produce /æ/ at 180 Hz for 80 ms with
moderate intensity, then pause 200 ms."

> **Key insight:** robotic-sounding speech comes from flat, monotone prosody —
> not from bad phoneme pronunciation.

### 4. Speech synthesis — generate the audio

- **Acoustic feature generation** — an acoustic model (often a transformer)
  converts phonemes + prosody targets into **mel-spectrograms** (visual
  representations of sound frequencies over time).
- **Vocoding** — a neural vocoder converts mel-spectrograms into raw audio
  waveforms (16,000–48,000 samples/second). Architectures: **WaveNet, WaveGlow,
  HiFi-GAN**.
- **Post-processing** — filtering, normalization, effects.

Neural vocoders deliver: high fidelity (near-studio quality), naturalness
(breathiness, voice quality), real-time efficiency, and flexibility across
speakers/languages/styles.

**Framing:** the vocoder is the **inverse of speech recognition** — recognition
converts audio → text; the vocoder converts linguistic representations → audio.

**The full pipeline example:** "Dr. Chen's appointment is at 3:00 PM" → normalize
("Doctor Chen's… three o'clock P M") → phonemes → prosody (pitch rises on
"appointment", pause after "is", emphasis on "three") → waveform. Under one second
on modern hardware.
