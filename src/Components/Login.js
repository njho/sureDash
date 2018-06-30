import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header, Image, Message, Segment, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className={' login-container'} style={{paddingTop: '4em'}}>
                <div className='login-form'>

                    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                    <Grid textAlign='center' style={{height: '100%'}} verticalAlign='bottom'>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Header as='h2' color='teal' textAlign='center'>
                                Please Log-In to your Admin Account
                            </Header>
                            <Form size='large'>
                                <Segment>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                    />

                                    <Button as={Link} to='/users' color='teal' fluid size='large'>
                                        Login
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Not an Admin? <a href='#'>Contact Your SureFuel Admin</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </Container>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

