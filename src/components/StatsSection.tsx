export default function StatsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-primary mb-6 tracking-wide">
                        Explore Vietnam With Confidence
                    </h2>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Stat 1 */}
                    <div
                        className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                        <div className="text-4xl md:text-5xl font-light text-primary mb-3">25,000+</div>
                        <div className="text-sm md:text-base text-gray-600 font-light tracking-wide">Happy Travelers</div>
                    </div>

                    {/* Stat 2 */}
                    <div
                        className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                        <div className="text-4xl md:text-5xl font-light text-primary mb-3">4.8/5</div>
                        <div className="text-sm md:text-base text-gray-600 font-light tracking-wide">Customer Rating</div>
                    </div>

                    {/* Stat 3 */}
                    <div
                        className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                        <div className="text-4xl md:text-5xl font-light text-primary mb-3">500+</div>
                        <div className="text-sm md:text-base text-gray-600 font-light tracking-wide">Successful Tours</div>
                    </div>

                    {/* Stat 4 */}
                    <div
                        className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                        <div className="text-4xl md:text-5xl font-light text-primary mb-3">15+</div>
                        <div className="text-sm md:text-base text-gray-600 font-light tracking-wide">Years Experience</div>
                    </div>
                </div>
            </div>
        </section >
    );
}