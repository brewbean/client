import React, { useState } from 'react';


const BrewTrakComment = () => {

    const [comment, setComment] = useState("Comment here...");
    return (
        <div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
    )
}

export default BrewTrakComment;