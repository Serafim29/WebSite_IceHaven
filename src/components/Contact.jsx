import React from 'react'
 
const Contact = () => {
    return (
        <section id='contact' className='py-16 flex flex-col xl:flex-row items-center justify-between'>
            <div className='relative w-full max-w-4xl text-center'>
                <h1 className='font-lanze text-[301px] text-primary'>SLOPE INSISGHTS</h1>
 
                <div className='absolute top-70 left-20 border-red-500 border backdrop-blur-lg transform -rotate-4 rounded-xl'>
                    <div className='p-12 rounded-xl'>
                        <div>
                            <img src="/images/about.png" alt="contact image" className='w-[600px] h-[600px] rounded-xl object-cover' />
                        </div>
                        <div className='space-y-3 mt-3 text-left'>
                            <p className='text-primary font-semibold text-4xl'>@ice.haven</p>
                            <p className='text-primary font-semibold flex items-center justify-start gap-2 text-4xl'>
                                <span>❤️</span>
                                <span>583</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Contact