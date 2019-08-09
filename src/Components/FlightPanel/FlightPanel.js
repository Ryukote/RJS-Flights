import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

import './FlightPanel.css';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

const FlightPanel = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let offer = props.value.offerItems[0];
    let segments = props.value.offerItems[0].services[0].segments;

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className={classes.root}>
            <ExpansionPanel
                expanded={expanded}
                onChange={handleChange(!expanded)}
            >
                <ExpansionPanelSummary
                    className="mainPanel"
                    expandIcon={<ExpandMoreIcon/>}
                    key={props.keyOf}
                    aria-controls={`panel${props.keyOf}bh-content`}
                    id={`panel${props.keyOf}bh-header`}
                >
                    <Typography key={props.keyOf} className={classes.heading}>
                        {`${props.value.id}`}
                    </Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className="detailPanel" key={props.keyOf}>
                        <Container>
                            <Row>
                                <Col>
                                    {`Total price: ${offer.price.total} EUR`}
                                </Col>

                                <Col>
                                    {`Total taxes: ${offer.price.totalTaxes} EUR`}
                                </Col>
                            </Row>

                            {
                                Object(segments).map((value, segmentKey) => {
                                    return (
                                        <div>
                                            <br/>
                                            <Row key={segmentKey}>
                                                <Col>
                                                    {"Duration:"}
                                                    <br/>{value.flightSegment.duration.split("T")[1]}
                                                </Col>

                                                <Col>
                                                    {"Departure airport:"} 
                                                    <br/>
                                                    {`${value.flightSegment.departure.iataCode}`}
                                                </Col>

                                                <Col>
                                                    {"Departure at:"}
                                                    <br/>
                                                    {`${value.flightSegment.departure.at.split('T')[0]}`}
                                                    <br/>
                                                    {`${value.flightSegment.departure.at.split('T')[1]}`}
                                                </Col>

                                                <Col>
                                                    {"Arrival airport:"} 
                                                    <br/>
                                                    {`${value.flightSegment.arrival.iataCode}`}
                                                </Col>

                                                <Col>
                                                    {"Arrival at:"}
                                                    <br/>
                                                    {`${value.flightSegment.arrival.at.split('T')[0]}`}
                                                    <br/>
                                                    {`${value.flightSegment.arrival.at.split('T')[1]}`}
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })
                            }
                        </Container>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default FlightPanel;