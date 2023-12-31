import './App.css';
import { useEffect, useState, useRef } from 'react'
import * as d3Base from 'd3';
import * as sankey from 'd3-sankey-awesome';

const dummyD3Data = {
  "links": [
    {
      "color": "rgb(204, 235, 197)",
      "source": "supply^Indigenous",
      "value": 17456.797743643932,
      "type": "Primary electricity",
      "target": "primary^Primary electricity",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary electricity"
    },
    {
      "color": "#a99",
      "source": "supply^Indigenous",
      "value": 7289.086460881651,
      "type": "Coal",
      "target": "primary^Coal",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "supply^Indigenous",
      "value": 36582.86715032196,
      "type": "Natural gas",
      "target": "primary^Natural gas",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "supply^Indigenous",
      "value": 7875.786415510635,
      "type": "Bioenergy & waste",
      "target": "primary^Bioenergy & waste",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "supply^Indigenous",
      "value": 43705.02267006658,
      "type": "Primary oils",
      "target": "primary^Primary oils",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "secondary^Manufactured fuel",
      "value": 181.94710221171306,
      "type": "Manufactured fuel",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "secondary^Manufactured fuel",
      "value": 562.9339604278301,
      "type": "Manufactured fuel",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "#bbb",
      "source": "transform^Power stns",
      "value": 39428.76183144403,
      "type": "loss",
      "target": "loss^*",
      "opacity": 1.0,
      "time": "*",
      "title": "loss"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "transform^Power stns",
      "value": 1726.4891687426475,
      "type": "Electricity",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "transform^Power stns",
      "value": 23866.77487614838,
      "type": "Electricity",
      "target": "secondary^Electricity",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "secondary^Petroleum products",
      "value": 4049.635481720205,
      "type": "Petroleum products",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "secondary^Petroleum products",
      "value": 4348.457783616835,
      "type": "Petroleum products",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "secondary^Petroleum products",
      "value": 52558.711756977624,
      "type": "Petroleum products",
      "target": "use1^Transport",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "primary^Manufactured fuel",
      "value": 150.57016561574463,
      "type": "Manufactured fuel",
      "target": "stocks^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "primary^Manufactured fuel",
      "value": 79.81473191936563,
      "type": "Manufactured fuel",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "primary^Manufactured fuel",
      "value": 1279.9229514573046,
      "type": "Manufactured fuel",
      "target": "transform^Other transform",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "primary^Manufactured fuel",
      "value": 916.1838459020296,
      "type": "Manufactured fuel",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "primary^Primary oils",
      "value": 1686.6360844300893,
      "type": "Primary oils",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "primary^Primary oils",
      "value": 33864.950813829884,
      "type": "Primary oils",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "primary^Primary oils",
      "value": 647.5583123035375,
      "type": "Primary oils",
      "target": "stocks^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "primary^Primary oils",
      "value": 66413.91331697532,
      "type": "Primary oils",
      "target": "transform^Refineries",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "primary^Primary electricity",
      "value": 3607.2639565815125,
      "type": "Primary electricity",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary electricity"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "primary^Primary electricity",
      "value": 13849.53378706242,
      "type": "Primary electricity",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Transport",
      "value": 769.1433381103549,
      "type": "Petroleum products",
      "target": "use^National navigation",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Transport",
      "value": 360.4348194511513,
      "type": "Electricity",
      "target": "use^Rail",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Transport",
      "value": 657.5114567061047,
      "type": "Petroleum products",
      "target": "use^Rail",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Transport",
      "value": 9.364016231464301,
      "type": "Coal",
      "target": "use^Rail",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Transport",
      "value": 1242.68878,
      "type": "Bioenergy & waste",
      "target": "use^Road",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Transport",
      "value": 5.809114359415306,
      "type": "Electricity",
      "target": "use^Road",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Transport",
      "value": 38713.24060826543,
      "type": "Petroleum products",
      "target": "use^Road",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Transport",
      "value": 12418.816353895738,
      "type": "Petroleum products",
      "target": "use^Air",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Other",
      "value": 23912.380968044916,
      "type": "Natural gas",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Other",
      "value": 9362.047633495942,
      "type": "Electricity",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "use1^Other",
      "value": 51.93465176268271,
      "type": "Heat sold",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Other",
      "value": 1687.9435370766894,
      "type": "Bioenergy & waste",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "#a99",
      "source": "use1^Other",
      "value": 413.64326007821035,
      "type": "Coal",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Other",
      "value": 2551.9357647994143,
      "type": "Petroleum products",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "use1^Other",
      "value": 181.94710221171306,
      "type": "Manufactured fuel",
      "target": "use^Domestic",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Other",
      "value": 4165.344169881583,
      "type": "Natural gas",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Other",
      "value": 6445.792520382646,
      "type": "Electricity",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "use1^Other",
      "value": 10.962689165950128,
      "type": "Heat sold",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Other",
      "value": 56.18745652947789,
      "type": "Bioenergy & waste",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Other",
      "value": 470.0414594532532,
      "type": "Petroleum products",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Other",
      "value": 3.526119684421716,
      "type": "Coal",
      "target": "use^Commercial",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Other",
      "value": 866.6453866088754,
      "type": "Natural gas",
      "target": "use^Miscellaneous",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Other",
      "value": 0.41427573,
      "type": "Bioenergy & waste",
      "target": "use^Miscellaneous",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Other",
      "value": 300.50460482266794,
      "type": "Petroleum products",
      "target": "use^Miscellaneous",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Other",
      "value": 4.4665272933854165,
      "type": "Coal",
      "target": "use^Miscellaneous",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Other",
      "value": 3178.7270697199997,
      "type": "Natural gas",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Other",
      "value": 1565.214931147846,
      "type": "Electricity",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "use1^Other",
      "value": 380.88115004299226,
      "type": "Heat sold",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Other",
      "value": 84.88731503057969,
      "type": "Bioenergy & waste",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Other",
      "value": 359.44876160650665,
      "type": "Petroleum products",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Other",
      "value": 16.48835673781308,
      "type": "Coal",
      "target": "use^Public administration",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Other",
      "value": 76.21630908310843,
      "type": "Natural gas",
      "target": "use^Agriculture",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Other",
      "value": 282.7825066382638,
      "type": "Bioenergy & waste",
      "target": "use^Agriculture",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Other",
      "value": 320.53580066788993,
      "type": "Electricity",
      "target": "use^Agriculture",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Other",
      "value": 367.7048910383629,
      "type": "Petroleum products",
      "target": "use^Agriculture",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "secondary^Heat sold",
      "value": 443.7784909716251,
      "type": "Heat sold",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "secondary^Heat sold",
      "value": 895.5930816852965,
      "type": "Heat sold",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "transfers^*",
      "value": 8.810609681422662,
      "type": "Manufactured fuel",
      "target": "secondary^Manufactured fuel",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "transfers^*",
      "value": 40029.58280244428,
      "type": "Natural gas",
      "target": "secondary^Natural gas",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "transfers^*",
      "value": 3536.490048107732,
      "type": "Petroleum products",
      "target": "secondary^Petroleum products",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "transfers^*",
      "value": 4057.0722892608856,
      "type": "Bioenergy & waste",
      "target": "secondary^Bioenergy & waste",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "transfers^*",
      "value": 4118.792057863588,
      "type": "Natural gas",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "transfers^*",
      "value": 3607.2639565815125,
      "type": "Electricity",
      "target": "secondary^Electricity",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "#a99",
      "source": "transfers^*",
      "value": 1943.0165404282525,
      "type": "Coal",
      "target": "secondary^Coal",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "primary^Coal",
      "value": 1943.0165404282525,
      "type": "Coal",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "primary^Coal",
      "value": 319.25063170471054,
      "type": "Coal",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "primary^Coal",
      "value": 2830.876252647094,
      "type": "Coal",
      "target": "stocks^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "primary^Coal",
      "value": 5437.913545601049,
      "type": "Coal",
      "target": "transform^Other transform",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "primary^Coal",
      "value": 24114.23651600609,
      "type": "Coal",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 1765.959295966466,
      "type": "Natural gas",
      "target": "use^Food, beverages etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 895.1553141814817,
      "type": "Electricity",
      "target": "use^Food, beverages etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 111.24968157975437,
      "type": "Petroleum products",
      "target": "use^Food, beverages etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 38.23417407516922,
      "type": "Coal",
      "target": "use^Food, beverages etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 214.32063017227065,
      "type": "Natural gas",
      "target": "use^Electrical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 498.50498170917854,
      "type": "Electricity",
      "target": "use^Electrical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 1.0168681255619814,
      "type": "Petroleum products",
      "target": "use^Electrical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 4.629662641391683,
      "type": "Coal",
      "target": "use^Electrical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 1.0963026655202064,
      "type": "Natural gas",
      "target": "use^Unclassified",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "use1^Industry",
      "value": 702.1684182558747,
      "type": "Bioenergy & waste",
      "target": "use^Unclassified",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 3376.0216528748315,
      "type": "Petroleum products",
      "target": "use^Unclassified",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "use1^Industry",
      "value": 45.82161388112513,
      "type": "Manufactured fuel",
      "target": "use^Unclassified",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 1301.4714139276107,
      "type": "Natural gas",
      "target": "use^Mineral products",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 549.3550735467611,
      "type": "Electricity",
      "target": "use^Mineral products",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 199.56518239493775,
      "type": "Petroleum products",
      "target": "use^Mineral products",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 781.6591654614322,
      "type": "Coal",
      "target": "use^Mineral products",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 499.60179439883893,
      "type": "Natural gas",
      "target": "use^Mechanical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 584.655939644016,
      "type": "Electricity",
      "target": "use^Mechanical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 9.665186804867751,
      "type": "Coal",
      "target": "use^Mechanical engineering etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 443.98019359258046,
      "type": "Natural gas",
      "target": "use^Textiles, leather etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 232.89206281546737,
      "type": "Electricity",
      "target": "use^Textiles, leather etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 53.43521731334183,
      "type": "Petroleum products",
      "target": "use^Textiles, leather etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 41.434328677534346,
      "type": "Coal",
      "target": "use^Textiles, leather etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 373.35373768385165,
      "type": "Natural gas",
      "target": "use^Vehicles",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 402.949557596239,
      "type": "Electricity",
      "target": "use^Vehicles",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 208.75181853770917,
      "type": "Petroleum products",
      "target": "use^Vehicles",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 38.87625960137279,
      "type": "Coal",
      "target": "use^Vehicles",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 674.919572767408,
      "type": "Natural gas",
      "target": "use^Paper, printing etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 905.6240061724668,
      "type": "Electricity",
      "target": "use^Paper, printing etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 36.06877168650574,
      "type": "Petroleum products",
      "target": "use^Paper, printing etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 78.77300779916035,
      "type": "Coal",
      "target": "use^Paper, printing etc",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 432.2111033869647,
      "type": "Natural gas",
      "target": "use^Other industries",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 1753.7458760475092,
      "type": "Electricity",
      "target": "use^Other industries",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "use1^Industry",
      "value": 428.50791057609626,
      "type": "Heat sold",
      "target": "use^Other industries",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 38.60603893220403,
      "type": "Petroleum products",
      "target": "use^Other industries",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 393.84555147572354,
      "type": "Coal",
      "target": "use^Other industries",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 365.8930028259209,
      "type": "Natural gas",
      "target": "use^Construction",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 118.09609251359124,
      "type": "Electricity",
      "target": "use^Construction",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 191.58257509914026,
      "type": "Petroleum products",
      "target": "use^Construction",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 5.471052937279541,
      "type": "Coal",
      "target": "use^Construction",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 468.4201678129911,
      "type": "Natural gas",
      "target": "use^Iron and steel",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "use1^Industry",
      "value": 517.112346546705,
      "type": "Manufactured fuel",
      "target": "use^Iron and steel",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 325.57902781695947,
      "type": "Electricity",
      "target": "use^Iron and steel",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 7.640847429714274,
      "type": "Petroleum products",
      "target": "use^Iron and steel",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 38.38480890350937,
      "type": "Coal",
      "target": "use^Iron and steel",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 169.293328948325,
      "type": "Natural gas",
      "target": "use^Non-ferrous metals",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 383.8554000604564,
      "type": "Electricity",
      "target": "use^Non-ferrous metals",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 0.028250511313204857,
      "type": "Petroleum products",
      "target": "use^Non-ferrous metals",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 15.091307635804357,
      "type": "Coal",
      "target": "use^Non-ferrous metals",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "use1^Industry",
      "value": 1242.4220353586186,
      "type": "Natural gas",
      "target": "use^Chemicals",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "use1^Industry",
      "value": 1378.2437939721242,
      "type": "Electricity",
      "target": "use^Chemicals",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "use1^Industry",
      "value": 467.0851711092003,
      "type": "Heat sold",
      "target": "use^Chemicals",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "use1^Industry",
      "value": 124.49087913182015,
      "type": "Petroleum products",
      "target": "use^Chemicals",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "#a99",
      "source": "use1^Industry",
      "value": 49.463754389713515,
      "type": "Coal",
      "target": "use^Chemicals",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "secondary^Coal",
      "value": 438.12426379383055,
      "type": "Coal",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "secondary^Coal",
      "value": 1495.5282604029585,
      "type": "Coal",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "#a99",
      "source": "secondary^Coal",
      "value": 9.364016231464301,
      "type": "Coal",
      "target": "use1^Transport",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "secondary^Natural gas",
      "value": 32199.313903338483,
      "type": "Natural gas",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "secondary^Natural gas",
      "value": 7952.942579507367,
      "type": "Natural gas",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "#bbb",
      "source": "transform^Other transform",
      "value": 3910.899075209493,
      "type": "loss",
      "target": "loss^*",
      "opacity": 1.0,
      "time": "*",
      "title": "loss"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "transform^Other transform",
      "value": 3263.5737709700243,
      "type": "Manufactured fuel",
      "target": "secondary^Manufactured fuel",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "transform^Other transform",
      "value": 29.028917621668104,
      "type": "Natural gas",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "transform^Other transform",
      "value": 44.37305972057728,
      "type": "Electricity",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "transform^Other transform",
      "value": 802.3206182895784,
      "type": "Manufactured fuel",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "transform^Other transform",
      "value": 1624.7170328735842,
      "type": "Heat sold",
      "target": "secondary^Heat sold",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "primary^Petroleum products",
      "value": 1849.6444053301711,
      "type": "Petroleum products",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "primary^Petroleum products",
      "value": 27331.44025820095,
      "type": "Petroleum products",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "primary^Petroleum products",
      "value": 150.24319973176745,
      "type": "Petroleum products",
      "target": "transform^Other transform",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "primary^Petroleum products",
      "value": 523.30572544344,
      "type": "Petroleum products",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "stocks^*",
      "value": 309.13463414650425,
      "type": "Petroleum products",
      "target": "primary^Petroleum products",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "primary^Electricity",
      "value": 233.8674411917045,
      "type": "Electricity",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "secondary^Electricity",
      "value": 17693.590885694324,
      "type": "Electricity",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "secondary^Electricity",
      "value": 8028.65712607625,
      "type": "Electricity",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "secondary^Electricity",
      "value": 366.24393381056666,
      "type": "Electricity",
      "target": "use1^Transport",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "#bbb",
      "source": "transform^Refineries",
      "value": 348.6310642500757,
      "type": "loss",
      "target": "loss^*",
      "opacity": 1.0,
      "time": "*",
      "title": "loss"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "transform^Refineries",
      "value": 98.02062866569099,
      "type": "Natural gas",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "transform^Refineries",
      "value": 391.0739824148065,
      "type": "Electricity",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(222, 203, 228)",
      "source": "transform^Refineries",
      "value": 285.3454602166624,
      "type": "Heat sold",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Heat sold"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "transform^Refineries",
      "value": 4122.958401067391,
      "type": "Petroleum products",
      "target": "own use^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "transform^Refineries",
      "value": 62643.00576663526,
      "type": "Petroleum products",
      "target": "secondary^Petroleum products",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "primary^Natural gas",
      "value": 40041.60914729338,
      "type": "Natural gas",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "primary^Natural gas",
      "value": 10998.049342244902,
      "type": "Natural gas",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "primary^Natural gas",
      "value": 204.89231127255871,
      "type": "Natural gas",
      "target": "stocks^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "primary^Natural gas",
      "value": 2237.9929517718692,
      "type": "Natural gas",
      "target": "transform^Other transform",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "primary^Natural gas",
      "value": 18778.597695450433,
      "type": "Natural gas",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(229, 216, 189)",
      "source": "supply^Imports",
      "value": 31782.466570000226,
      "type": "Petroleum products",
      "target": "primary^Petroleum products",
      "opacity": 1.0,
      "time": "*",
      "title": "Petroleum products"
    },
    {
      "color": "rgb(204, 235, 197)",
      "source": "supply^Imports",
      "value": 1997.399476978923,
      "type": "Electricity",
      "target": "primary^Electricity",
      "opacity": 1.0,
      "time": "*",
      "title": "Electricity"
    },
    {
      "color": "rgb(254, 217, 166)",
      "source": "supply^Imports",
      "value": 668.9550511532844,
      "type": "Manufactured fuel",
      "target": "primary^Manufactured fuel",
      "opacity": 1.0,
      "time": "*",
      "title": "Manufactured fuel"
    },
    {
      "color": "rgb(245, 245, 204)",
      "source": "supply^Imports",
      "value": 41028.63418292766,
      "type": "Natural gas",
      "target": "primary^Natural gas",
      "opacity": 1.0,
      "time": "*",
      "title": "Natural gas"
    },
    {
      "color": "rgb(251, 180, 174)",
      "source": "supply^Imports",
      "value": 58851.989821902294,
      "type": "Primary oils",
      "target": "primary^Primary oils",
      "opacity": 1.0,
      "time": "*",
      "title": "Primary oils"
    },
    {
      "color": "#a99",
      "source": "supply^Imports",
      "value": 27289.443247267598,
      "type": "Coal",
      "target": "primary^Coal",
      "opacity": 1.0,
      "time": "*",
      "title": "Coal"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "supply^Imports",
      "value": 3150.8264406597914,
      "type": "Bioenergy & waste",
      "target": "primary^Bioenergy & waste",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "secondary^Bioenergy & waste",
      "value": 2112.215091005011,
      "type": "Bioenergy & waste",
      "target": "use1^Other",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "secondary^Bioenergy & waste",
      "value": 702.1684182558747,
      "type": "Bioenergy & waste",
      "target": "use1^Industry",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "secondary^Bioenergy & waste",
      "value": 1242.68878,
      "type": "Bioenergy & waste",
      "target": "use1^Transport",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "primary^Bioenergy & waste",
      "value": 4057.0722892608856,
      "type": "Bioenergy & waste",
      "target": "transfers^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "primary^Bioenergy & waste",
      "value": 360.83314754630646,
      "type": "Bioenergy & waste",
      "target": "sink^*",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "primary^Bioenergy & waste",
      "value": 74.54082711075722,
      "type": "Bioenergy & waste",
      "target": "transform^Other transform",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    },
    {
      "color": "rgb(253, 218, 236)",
      "source": "primary^Bioenergy & waste",
      "value": 6534.166592252478,
      "type": "Bioenergy & waste",
      "target": "transform^Power stns",
      "opacity": 1.0,
      "time": "*",
      "title": "Bioenergy & waste"
    }
  ],
  "groups": [
    {
      "type": "process",
      "title": "Supply",
      "bundle": null,
      "id": "supply",
      "nodes": [
        "supply^Indigenous",
        "supply^Imports"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Primary",
      "bundle": null,
      "id": "primary",
      "nodes": [
        "primary^Natural gas",
        "primary^Bioenergy & waste",
        "primary^Coal",
        "primary^Manufactured fuel",
        "primary^Primary electricity",
        "primary^Electricity",
        "primary^Petroleum products",
        "primary^Primary oils"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Stocks",
      "bundle": null,
      "id": "stocks",
      "nodes": [
        "stocks^*"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Direct use",
      "bundle": null,
      "id": "transfers",
      "nodes": [
        "transfers^*"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "",
      "bundle": null,
      "id": "transform",
      "nodes": [
        "transform^Power stns",
        "transform^Other transform",
        "transform^Refineries"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Exports & bunkers",
      "bundle": null,
      "id": "sink",
      "nodes": [
        "sink^*"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Secondary",
      "bundle": null,
      "id": "secondary",
      "nodes": [
        "secondary^Natural gas",
        "secondary^Bioenergy & waste",
        "secondary^Coal",
        "secondary^Electricity",
        "secondary^Manufactured fuel",
        "secondary^Heat sold",
        "secondary^Petroleum products"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Energy industry use",
      "bundle": null,
      "id": "own use",
      "nodes": [
        "own use^*"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "Conversion loss",
      "bundle": null,
      "id": "loss",
      "nodes": [
        "loss^*"
      ],
      "def_pos": null
    },
    {
      "type": "group",
      "title": "",
      "bundle": null,
      "id": "use1",
      "nodes": [
        "use1^Other",
        "use1^Industry",
        "use1^Transport"
      ],
      "def_pos": null
    },
    {
      "type": "process",
      "title": "",
      "bundle": null,
      "id": "use",
      "nodes": [
        "use^Domestic",
        "use^Public administration",
        "use^Commercial",
        "use^Agriculture",
        "use^Miscellaneous",
        "use^Unclassified",
        "use^Iron and steel",
        "use^Non-ferrous metals",
        "use^Mineral products",
        "use^Chemicals",
        "use^Mechanical engineering etc",
        "use^Electrical engineering etc",
        "use^Vehicles",
        "use^Food, beverages etc",
        "use^Textiles, leather etc",
        "use^Paper, printing etc",
        "use^Other industries",
        "use^Construction",
        "use^Air",
        "use^Rail",
        "use^Road",
        "use^National navigation"
      ],
      "def_pos": null
    }
  ],
  "nodes": [
    {
      "bundle": null,
      "title": "Rail",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Rail",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Other industries",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Other industries",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Agriculture",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Agriculture",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Indigenous",
      "visibility": "visible",
      "def_pos": null,
      "id": "supply^Indigenous",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Manufactured fuel",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Manufactured fuel",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Power stns",
      "visibility": "visible",
      "def_pos": null,
      "id": "transform^Power stns",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Petroleum products",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Petroleum products",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Miscellaneous",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Miscellaneous",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Mechanical engineering etc",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Mechanical engineering etc",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Manufactured fuel",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Manufactured fuel",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Food, beverages etc",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Food, beverages etc",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Primary oils",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Primary oils",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Exports & bunkers",
      "visibility": "visible",
      "def_pos": null,
      "id": "sink^*",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Primary electricity",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Primary electricity",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Transport",
      "visibility": "visible",
      "def_pos": null,
      "id": "use1^Transport",
      "style": "group",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Air",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Air",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Electrical engineering etc",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Electrical engineering etc",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Other",
      "visibility": "visible",
      "def_pos": null,
      "id": "use1^Other",
      "style": "group",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Chemicals",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Chemicals",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Heat sold",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Heat sold",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Construction",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Construction",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Direct use",
      "visibility": "visible",
      "def_pos": null,
      "id": "transfers^*",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Textiles, leather etc",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Textiles, leather etc",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Coal",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Coal",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Industry",
      "visibility": "visible",
      "def_pos": null,
      "id": "use1^Industry",
      "style": "group",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Road",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Road",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Coal",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Coal",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Natural gas",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Natural gas",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Vehicles",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Vehicles",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Other transform",
      "visibility": "visible",
      "def_pos": null,
      "id": "transform^Other transform",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Petroleum products",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Petroleum products",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Iron and steel",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Iron and steel",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Domestic",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Domestic",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Mineral products",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Mineral products",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Stocks",
      "visibility": "visible",
      "def_pos": null,
      "id": "stocks^*",
      "style": "process",
      "direction": "l"
    },
    {
      "bundle": null,
      "title": "Electricity",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Electricity",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "National navigation",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^National navigation",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Non-ferrous metals",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Non-ferrous metals",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Electricity",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Electricity",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Refineries",
      "visibility": "visible",
      "def_pos": null,
      "id": "transform^Refineries",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Conversion loss",
      "visibility": "visible",
      "def_pos": null,
      "id": "loss^*",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Natural gas",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Natural gas",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Unclassified",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Unclassified",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Energy industry use",
      "visibility": "visible",
      "def_pos": null,
      "id": "own use^*",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Paper, printing etc",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Paper, printing etc",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Imports",
      "visibility": "visible",
      "def_pos": null,
      "id": "supply^Imports",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Bioenergy & waste",
      "visibility": "visible",
      "def_pos": null,
      "id": "secondary^Bioenergy & waste",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Public administration",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Public administration",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Bioenergy & waste",
      "visibility": "visible",
      "def_pos": null,
      "id": "primary^Bioenergy & waste",
      "style": "process",
      "direction": "r"
    },
    {
      "bundle": null,
      "title": "Commercial",
      "visibility": "visible",
      "def_pos": null,
      "id": "use^Commercial",
      "style": "process",
      "direction": "r"
    }
  ],
  "order": [
    [
      [
        "supply^Imports",
        "supply^Indigenous",

      ],
      [],
      []
    ],
    [
      [
        "primary^Natural gas",
        "primary^Bioenergy & waste",
        "primary^Coal",
        "primary^Manufactured fuel",
        "primary^Primary electricity",
        "primary^Electricity",
        "primary^Petroleum products",
        "primary^Primary oils"
      ],
      [
        "stocks^*"
      ],
      []
    ],
    [
      [
        "transfers^*",
        "transform^Power stns",
        "transform^Other transform",
        "transform^Refineries"
      ],
      [],
      [
        "sink^*"
      ]
    ],
    [
      [
        "secondary^Natural gas",
        "secondary^Bioenergy & waste",
        "secondary^Coal",
        "secondary^Electricity",
        "secondary^Manufactured fuel",
        "secondary^Heat sold",
        "secondary^Petroleum products"
      ],
      [
        "own use^*"
      ],
      [
        "loss^*"
      ]
    ],
    [
      [
        "use1^Other",
        "use1^Industry",
        "use1^Transport"
      ],
      [],
      []
    ],
    [
      [
        "use^Domestic",
        "use^Public administration",
        "use^Commercial",
        "use^Agriculture",
        "use^Miscellaneous",
        "use^Unclassified",
        "use^Iron and steel",
        "use^Non-ferrous metals",
        "use^Mineral products",
        "use^Chemicals",
        "use^Mechanical engineering etc",
        "use^Electrical engineering etc",
        "use^Vehicles",
        "use^Food, beverages etc",
        "use^Textiles, leather etc",
        "use^Paper, printing etc",
        "use^Other industries",
        "use^Construction",
        "use^Air",
        "use^Rail",
        "use^Road",
        "use^National navigation"
      ],
      [],
      []
    ]
  ]
}


function App() {
  const sankeyDiagramDiv = useRef(null);
  const d3 = {
    ...d3Base,
    sankey,
  }
  useEffect(() => {
    const d3SankeyChartsLayoutData = dummyD3Data;
    const layout = d3.sankey.sankey().extent([
      [100, 0],
      [3000, 1000] // controls for spacing of the groups/sankey
    ]);


    const diagram = d3.sankey.sankeyDiagram().linkTitle(
      d3.sankey.sankeyLinkTitle(
        function (d) {
          return d.title;
        },
        function (d) {
          return d.title;
        },
        d3.format(".3s")
      )
    ).linkColor(function (d) {
      return d.color;
    });

    layout.ordering(d3SankeyChartsLayoutData.order);
    d3.select(sankeyDiagramDiv.current)
      .datum(layout(d3SankeyChartsLayoutData))
      .call(diagram.groups(d3SankeyChartsLayoutData.groups));
  }, [sankeyDiagramDiv]);


  return (
    <div className='background-dotted mt-5 mx-2 rounded' style={{ width: '3000px', height: '2000px', overflow: 'scroll' }}>
      <svg id="sankey" ref={sankeyDiagramDiv} style={{ background: 'transparent', border: 'none', width: '500%', height: '100%' }}></svg>
    </div>
  );
}

export default App;
