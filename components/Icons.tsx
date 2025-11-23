import React from 'react';
import { 
  Activity, 
  Cpu, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Search,
  Menu,
  Bell,
  Radio,
  Thermometer,
  MoreHorizontal
} from 'lucide-react';

export const Icons = {
  Activity: (props: any) => <Activity {...props} />,
  Cpu: (props: any) => <Cpu {...props} />,
  Globe: (props: any) => <Globe {...props} />,
  Alert: (props: any) => <AlertTriangle {...props} />,
  Check: (props: any) => <CheckCircle {...props} />,
  Zap: (props: any) => <Zap {...props} />,
  Search: (props: any) => <Search {...props} />,
  Menu: (props: any) => <Menu {...props} />,
  Bell: (props: any) => <Bell {...props} />,
  Radio: (props: any) => <Radio {...props} />,
  Temp: (props: any) => <Thermometer {...props} />,
  More: (props: any) => <MoreHorizontal {...props} />,
};
