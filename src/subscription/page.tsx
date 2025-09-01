import React from 'react';

const Subscription = () => {
    return (
        <main className="max-w-6xl mx-auto py-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">Pricing Plans</h1>
                <p className="text-white text-lg">Choose the perfect plan for your learning journey</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
                    <p className="text-4xl font-bold mb-6 text-white">$0<span className="text-lg text-white">/month</span></p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Access to basic courses
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Community forums
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Basic support
                        </li>
                    </ul>
                    <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700">
                        Get Started
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-yellow-400 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                    <p className="text-4xl font-bold mb-6 text-white">$29<span className="text-lg text-white">/month</span></p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Everything in Free
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Premium courses
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            AI companions
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Priority support
                        </li>
                    </ul>
                    <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                        Start Pro Trial
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                    <p className="text-4xl font-bold mb-6 text-white">$99<span className="text-lg text-white">/month</span></p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Everything in Pro
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Custom integrations
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Dedicated support
                        </li>
                        <li className="flex items-center text-white">
                            <span className="text-green-500 mr-2">✓</span>
                            Advanced analytics
                        </li>
                    </ul>
                    <button className="w-full bg-[#0a174e] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1a2a6b] transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Subscription
