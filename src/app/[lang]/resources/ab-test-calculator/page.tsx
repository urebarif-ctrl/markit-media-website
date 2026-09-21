"use client";

import { useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { JsonLd } from "@/components/json-ld";

function calculateSampleSize(
  baselineRate: number,
  minimumDetectableEffect: number
): number {
  const zAlpha = 1.96; // 95% confidence
  const zBeta = 0.84; // 80% power
  const p1 = baselineRate;
  const p2 = baselineRate * (1 + minimumDetectableEffect);
  const delta = p2 - p1;
  if (delta === 0) return 0;
  const numerator =
    Math.pow(zAlpha + zBeta, 2) * (p1 * (1 - p1) + p2 * (1 - p2));
  const denominator = Math.pow(delta, 2);
  return Math.ceil(numerator / denominator);
}

export default function ABTestCalculatorPage() {
  const [conversionRate, setConversionRate] = useState("5");
  const [expectedLift, setExpectedLift] = useState("10");
  const [dailyVisitors, setDailyVisitors] = useState("1000");
  const [calculated, setCalculated] = useState(false);

  const cr = parseFloat(conversionRate) / 100;
  const lift = parseFloat(expectedLift) / 100;
  const visitors = parseInt(dailyVisitors, 10);

  const isValid =
    !isNaN(cr) &&
    !isNaN(lift) &&
    !isNaN(visitors) &&
    cr > 0 &&
    cr < 1 &&
    lift > 0 &&
    visitors > 0;

  const sampleSizePerVariation = isValid ? calculateSampleSize(cr, lift) : 0;
  const totalSampleSize = sampleSizePerVariation * 2;
  const durationDays =
    isValid && visitors > 0
      ? Math.ceil(totalSampleSize / visitors)
      : 0;
  const durationWeeks = Math.ceil(durationDays / 7);
  const improvedRate = cr * (1 + lift);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (isValid) setCalculated(true);
  }

  function handleReset() {
    setConversionRate("5");
    setExpectedLift("10");
    setDailyVisitors("1000");
    setCalculated(false);
  }

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="px-6 lg:px-12 pt-20" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-base text-gray-400 max-w-7xl mx-auto">
          <li>
            <Link href="/" className="hover:text-black transition-colors motion-reduce:transition-none">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/resources" className="hover:text-black transition-colors motion-reduce:transition-none">
              Resources
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-black font-medium">A/B Test Calculator</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              A/B Testing Calculator
            </h1>
            <SectionDesc>
              Calculate the sample size and duration needed for a statistically
              significant A/B test. Enter your traffic and conversion rates to
              get instant results.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-6 lg:px-12 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <Animate animation="fade-up" delay={100}>
            <form onSubmit={handleCalculate} className="space-y-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Your Test Parameters
              </h2>

              <div>
                <label
                  htmlFor="conversionRate"
                  className="block text-base font-bold text-black mb-2"
                >
                  Current Conversion Rate (%)
                </label>
                <input
                  id="conversionRate"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="99"
                  value={conversionRate}
                  onChange={(e) => {
                    setConversionRate(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="e.g. 5"
                  className="w-full border border-gray-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
                />
                <p className="text-base text-gray-400 mt-1">
                  The percentage of visitors who currently convert.
                </p>
              </div>

              <div>
                <label
                  htmlFor="expectedLift"
                  className="block text-base font-bold text-black mb-2"
                >
                  Expected Improvement (%)
                </label>
                <input
                  id="expectedLift"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="500"
                  value={expectedLift}
                  onChange={(e) => {
                    setExpectedLift(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
                />
                <p className="text-base text-gray-400 mt-1">
                  The relative lift you expect. A 10% lift on a 5% conversion
                  rate means the new rate would be 5.5%.
                </p>
              </div>

              <div>
                <label
                  htmlFor="dailyVisitors"
                  className="block text-base font-bold text-black mb-2"
                >
                  Daily Visitors to Test
                </label>
                <input
                  id="dailyVisitors"
                  type="number"
                  step="1"
                  min="1"
                  value={dailyVisitors}
                  onChange={(e) => {
                    setDailyVisitors(e.target.value);
                    setCalculated(false);
                  }}
                  placeholder="e.g. 1000"
                  className="w-full border border-gray-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
                />
                <p className="text-base text-gray-400 mt-1">
                  Total daily visitors that will be split between variations.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:bg-gray-300 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-gray-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none min-h-[44px] min-w-[44px]"
                >
                  Reset
                </button>
              </div>
            </form>
          </Animate>

          {/* Results */}
          <Animate animation="fade-up" delay={200}>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Results
              </h2>

              {calculated && isValid ? (
                <div className="bg-gray-50 border border-gray-200 p-8 space-y-0">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Baseline conversion rate
                    </span>
                    <span className="text-base font-bold text-black">
                      {(cr * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Target conversion rate
                    </span>
                    <span className="text-base font-bold text-black">
                      {(improvedRate * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Sample size per variation
                    </span>
                    <span className="text-base font-bold text-black">
                      {sampleSizePerVariation.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Total sample size
                    </span>
                    <span className="text-base font-bold text-black">
                      {totalSampleSize.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Confidence level
                    </span>
                    <span className="text-base font-bold text-black">95%</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-base text-gray-600">
                      Statistical power
                    </span>
                    <span className="text-base font-bold text-black">80%</span>
                  </div>
                  <div className="flex justify-between items-center py-4 bg-black text-white px-6 -mx-8 -mb-8">
                    <span className="text-base font-bold">
                      Estimated duration
                    </span>
                    <span className="text-2xl font-extrabold">
                      {durationDays} day{durationDays !== 1 ? "s" : ""}
                      {durationWeeks > 0 && (
                        <span className="text-base font-bold text-gray-400 ml-2">
                          ({durationWeeks} week{durationWeeks !== 1 ? "s" : ""})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 p-8 flex items-center justify-center min-h-[300px]">
                  <p className="text-base text-gray-400 text-center">
                    Enter your test parameters and click Calculate to see
                    results.
                  </p>
                </div>
              )}

              {calculated && isValid && (
                <p className="text-base text-gray-400 mt-4 leading-relaxed">
                  These calculations use a two-tailed test with 95% confidence
                  and 80% statistical power. Actual test duration may vary based
                  on traffic fluctuations.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Educational Section */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              A/B Testing Fundamentals
            </h2>
          </Animate>

          <div className="space-y-12">
            <Animate animation="fade-up" delay={100}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  What Is Statistical Significance?
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Statistical significance tells you whether the difference
                  between your control and variation is real or just due to
                  random chance. A 95% confidence level means there is only a 5%
                  probability that the observed difference happened by luck. Without
                  reaching statistical significance, you cannot trust your test
                  results to hold up over time.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Why Sample Size Matters
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Running a test with too few visitors leads to unreliable
                  results. Small samples amplify random noise, making it easy to
                  mistake a fluke for a real improvement. Calculating your
                  required sample size before you start ensures your test has
                  enough statistical power to detect the effect you are looking
                  for. Ending a test early because it &quot;looks like a
                  winner&quot; is one of the most common and costly mistakes in
                  A/B testing.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Common A/B Testing Mistakes
                </h3>
                <ul className="space-y-3 text-base text-gray-600 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">1.</span>
                    <span>
                      <strong className="text-black">Stopping too early.</strong>{" "}
                      Calling a test before reaching your required sample size
                      dramatically increases the chance of a false positive.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">2.</span>
                    <span>
                      <strong className="text-black">Testing too many variations.</strong>{" "}
                      Each additional variation increases the total sample you
                      need. Focus on one clear hypothesis at a time.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">3.</span>
                    <span>
                      <strong className="text-black">Ignoring external factors.</strong>{" "}
                      Seasonality, promotions, and traffic source changes can
                      skew results. Run tests during stable traffic periods when
                      possible.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">4.</span>
                    <span>
                      <strong className="text-black">Not defining success metrics upfront.</strong>{" "}
                      Decide what you are measuring before the test starts.
                      Changing your primary metric after the fact introduces bias.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">5.</span>
                    <span>
                      <strong className="text-black">Testing tiny changes on low-traffic pages.</strong>{" "}
                      Small effects require enormous sample sizes to detect.
                      Focus on high-impact changes where you have enough traffic
                      to reach significance in a reasonable timeframe.
                    </span>
                  </li>
                </ul>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  How This Calculator Works
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  This calculator uses a standard two-proportion z-test formula.
                  It takes your baseline conversion rate and the minimum
                  improvement you want to detect, then calculates how many
                  visitors each variation needs using a 95% confidence level
                  (z = 1.96) and 80% statistical power (z = 0.84). The
                  estimated duration divides the total sample size across both
                  variations by your daily traffic.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Running A/B Tests That Actually Move the Needle?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team designs, implements, and analyzes conversion experiments
              so you can make data-driven decisions with confidence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "A/B Test Sample Size Calculator — Run Confident Experiments",
          description: "Use our free A/B test sample size calculator to determine how many visitors you need for statistically significant results. Set confidence level, power, and minimum detectable effect.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </article>
  );
}
