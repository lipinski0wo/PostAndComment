import React, { Component } from 'react';
import { connect } from 'react-redux';

import SinglePost from '../post/SinglePost';

export class Post extends Component {
    render() {
        return (
            <div className="postsBox">
                <div className="postBox">
                    <SinglePost postId={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Post);
