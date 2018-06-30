import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Radio, Form, Grid, Header, Input, Label, Icon, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{paddingTop: '4em'}}>

                <Grid style={{height: '100%', marginTop: '30px'}} verticalAlign='bottom'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h1' color='teal' textAlign='left'>
                            Driver Management & Search
                        </Header>
                        <Form size='large'>
                            <Form.Group inline>

                                <Form.Field
                                    control={Radio}
                                    label='UID'
                                    value='2'
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Name'
                                    value='2'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Field>
                                <label>Identifier Search</label>
                                <Input icon={{name: 'search', circular: true, link: true}} placeholder='Search...'/>
                            </Form.Field>

                        </Form>

                    </Grid.Column>
                </Grid>
                <Grid divided='vertically' style={{marginTop: '30px'}}>
                    <Grid.Row as={Link} to={`/userdetail/`} verticalAlign='middle'>
                        <Grid.Column width={14}>
                            <Header as='h2' color={'teal'} >
                                Driver 1
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={2}>
                            <Icon name='chevron right' size='big' color='teal'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row as={Link} to={`/userdetail/`} verticalAlign='middle'>
                        <Grid.Column width={14}>
                            <Header as='h2' color={'teal'} >
                                Driver 2
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={2}>
                            <Icon name='chevron right' size='big' color='teal'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

