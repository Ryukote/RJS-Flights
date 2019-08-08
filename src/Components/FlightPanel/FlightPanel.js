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
    let key = props.key;
    let offer = props.value.offerItems[0];
    let segments = props.value.offerItems[0].services[0].segments;

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className={classes.root}>
            <ExpansionPanel
                expanded={expanded === `panel${key}`}
                onChange={handleChange(`panel${key}`)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={`panel${key}bh-content`}
                    id={`panel${key}bh-header`}
                >
                    <Typography className={classes.heading}>
                        {`Flight offer ${props.value.id}`}
                    </Typography>
                </ExpansionPanelSummary>

                <br/>

                <ExpansionPanelDetails className="detailPanel">
                    <Typography>
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
                                                {`Aircraft: ${value.flightSegment.aircraft.code}`}
                                            </Col>

                                            <Col>
                                                {`Departure airport: ${value.flightSegment.departure.iataCode}`}
                                            </Col>

                                            <Col>
                                                {`Departure at: ${value.flightSegment.departure.at}`}
                                            </Col>

                                            <Col>
                                                {`Arrival airport: ${value.flightSegment.arrival.iataCode}`}
                                            </Col>

                                            <Col>
                                                {`Arrival at: ${value.flightSegment.arrival.at}`}
                                            </Col>
                                        </Row>
                                        </div>
                                    );
                                })
                            }
                        </Container>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default FlightPanel;