import React, { Component } from 'react';
class Hamberg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <header>
			<div class="container">
				<div class="d-flex justify-content-between align-items-center">
					<a id="hamburger" href="#"><i class="fas fa-bars"></i></a>
				</div>
			</div>
		</header>
         );
    }
}
 
export default Hamberg;