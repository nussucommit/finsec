import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import ActionButtonGroup from '../../components/Submission/ActionButtonGroup/'
import SubmissionFormGroup from '../../components/Submission'

function SubmissionPage() {
  return (
    <Container maxWidth='lg'>
      <h1>Submission</h1>
      <ActionButtonGroup/>
      <SubmissionFormGroup/>
    </Container>
  );
}

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <SubmissionPage />;
  }
}

export default Submission;
