import React from 'react'

import withOwner from 'components/hoc/withOwner'

const Secret = (props) => {
    return (
        <h1>I am Secret Page, only OWNER user can see me!</h1>
    )
}

export default withOwner(Secret)