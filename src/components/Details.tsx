import React from 'react';

const details = [
    {
        value: '#1',
        label: 'بزرگترین سیستم مشاوره بلاکچنینی',
    },
    {
        value: '9654',
        label: 'پرونده های حل شده',
    },
    {
        value: '+300 ',
        label: 'پرونده های در دست اقدام',
    },
    {
        value: '+10 میلیون نفر',
        label: 'بیشترین کاربر',
    },
];

const Details: React.FC = () => {
    return (
        <section
            className="w-full bg-gradient-to-r from-walletyar-primary to-purple-800 py-8 px-2 md:px-0 mt-16 rounded-xl"
            dir="rtl"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {details.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-white min-w-[150px] flex-1">
                        <span className="text-2xl md:text-3xl font-extrabold mb-1 drop-shadow-lg">{item.value}</span>
                        <span className="text-lg md:text-xl font-medium drop-shadow text-center whitespace-nowrap">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Details;
