import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
        <div className="fixed top-0 left-0 flex flex-col items-center justify-center h-full z-40 w-full bg-black/5">
            <div className="spinner">
                <React.Fragment>
                    <svg width={0} height={0}>
                        <defs>
                            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#B0D4B8" />
                                <stop offset="100%" stopColor="#A4C3A2" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <CircularProgress size={300} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                </React.Fragment></div>
            <div className='text-4xl mt-20 font-bold'>Loading...</div>
        </div>
    );
}

export default Loading;