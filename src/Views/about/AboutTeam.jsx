import React from 'react';

function AboutTeam() {
    const teamMembers = [
        {
            name: "John Doe",
            role: "CEO & Founder",
            bio: "Visionary leader with 15+ years in logistics",
            social: {
                linkedin: "#",
                twitter: "#"
            }
        },
        {
            name: "Jane Smith",
            role: "Operations Manager",
            bio: "Logistics expert ensuring seamless deliveries",
            social: {
                linkedin: "#",
                twitter: "#"
            }
        },
        {
            name: "Michael Brown",
            role: "Head of Customer Support",
            bio: "Customer satisfaction champion",
            social: {
                linkedin: "#",
                twitter: "#"
            }
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="relative inline-block pb-2">
                            Meet Our Team
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        The passionate professionals behind our exceptional delivery services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative pt-8 px-8">
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-blue-100 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 pt-12 text-center">
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 mb-4">{member.bio}</p>
                                <div className="flex justify-center space-x-4">
                                    <a href={member.social.linkedin} className="text-blue-500 hover:text-blue-700">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutTeam;