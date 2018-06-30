import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Menu, Icon, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


class FallthroughMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'app-container'}>
                <Menu fixed='top' inverted style={{height: '4em', backgroundColor: '#00b5ad'}}>
                    <Container fluid>
                        <Menu.Item header as={Link} to='/'>
                            <Button circular icon='user'/>
                        </Menu.Item>
                        <Menu.Item as={Link} to='/Users'>
                            Drivers
                        </Menu.Item>
                        <Menu.Item as={Link} to='/Jobs'>
                            Jobs
                        </Menu.Item>
                  
                    </Container>
                </Menu>
                <Container className={'app-container'}>{this.props.children}</Container>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FallthroughMenu));

/*            */