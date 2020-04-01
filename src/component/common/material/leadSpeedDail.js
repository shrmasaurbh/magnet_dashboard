import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CancelIcon from '@material-ui/icons/Cancel';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LeadModel from "../../common/modal/leadModal.js";

const styles = theme => ({
  speedDial: {
    position: "fixed",
    top: theme.spacing(7),
    right: theme.spacing(3)
  }
});

class SpeedDialLead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hidden: false,
            addModalShow : false,
            updateModalShow : false
        };
    }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleSecondaryClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleModal=(value)=>{
      this.setState({addModalShow : !this.state.addModalShow});
  }

  updateHandleModal=(value)=>{
      this.setState({updateModalShow : !this.state.updateModalShow});
  }

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          direction="left"
          open={open}
        >
            <SpeedDialAction
              key="Add"
              icon=<AddIcon />
              tooltipTitle="Add Lead"
              onClick={this.handleModal}
            />
            <SpeedDialAction
              key="Edit"
              icon=<EditIcon />
              tooltipTitle="Update Lead"
              onClick={this.updateHandleModal}
            />
            <SpeedDialAction
              key="Assigned"
              icon=<AssignmentTurnedInIcon />
              tooltipTitle="Assigned Lead"
              href='/leads/assigned'
            />
            <SpeedDialAction
              key="Cancel"
              icon=<CancelIcon />
              tooltipTitle="Cancel Lead"
              href='/leads/cancel'
            />
            <SpeedDialAction
              key="Open"
              icon=<LockOpenIcon />
              tooltipTitle="Open Lead"
              href='/leads/open'
            />
        </SpeedDial>
        <LeadModel show={this.state.addModalShow} fromType="addLead" changeModal={this.handleModal}/>

      </div>
    );
  }
}

SpeedDialLead.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpeedDialLead);
