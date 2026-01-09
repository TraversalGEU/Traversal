import React from 'react'
import Section1 from './MainSections/Section1'
import Section2 from './MainSections/Section2'
import Section3 from './MainSections/Section3'
import Border from './Border'
import Section4 from './MainSections/Section4'
import Section5 from './MainSections/Section5'

export default function Main() {
  return (
    <div >
      <Section1/>
      <Border/>
      <Section2/>
      <Border/>
      <Section3/>
      <Border/>
      <Section4/>
      <Border/>
      <Section5/>
    </div>
  )
}
