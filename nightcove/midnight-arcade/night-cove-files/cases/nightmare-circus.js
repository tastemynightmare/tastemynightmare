/* Original case documents. Content is separate from the interface and rules. */
(function (root) {
  'use strict';
  const paper = (id, title, kind, author, date, stage, paragraphs, note = '') => ({ id, title, kind, author, date, stage, paragraphs, note });
  root.NC_CASE = {
    id: 'circus-2016-v1', title: 'The Girl Behind the Wall', setting: 'Nightmare Circus', date: '21 October 2016', reopened: '27 October 2026',
    people: [
      ['Ruth Mercer', 'Caretaker · 58', 'Kept the building working and the neighbours talking. Found dead during the search for Anya.'],
      ['Nadia Bobinsky', 'Mother · 39 in 2016', 'Returned to care for her ill father with three children. Had confronted Pavel earlier that evening.'],
      ['Alexei Bobinsky', 'Brother · 17 in 2016', 'Left with Anya without telling Nadia. Initially concealed their destination.'],
      ['Mila Bobinsky', 'Sister · 9 in 2016', 'Saw a figure at the upstairs window. Requests the present-day review.'],
      ['Anya Bobinsky', 'Sister · 8 in 2016', 'Received invitations to a secret circus. Located alive with Alexei the following afternoon.'],
      ['Mr. Bobinsky', 'Grandfather · retired performer', 'His daughter came to care for him seventeen years after the old affair involving Caroline and the little door.'],
      ['Pavel Orlov', 'Restorer · former pupil', 'Offered help with the circus collection. Says he was buying supplies while Ruth was attacked.'],
      ['Etta Bell', 'Property manager', 'Held a spare service-door key. Disputed Ruth’s spending on repairs and initially understated her access.']
    ],
    exhibits: [
      paper('E01', 'The original incident file', 'Police summary', 'Detective S. Hume', '22 October 2016', 0, [
        ['Two investigations', 'At 20:40 on 21 October, Nadia Bobinsky reported her eight-year-old daughter Anya missing from the Pink Palace. Her son Alexei, seventeen, was also absent. At 21:17, a searcher called emergency services after locating caretaker Ruth Mercer behind a scenery panel in the ground-floor workroom.'],
        ['The children', 'Anya and Alexei were located alive at Leonie Cross’s address at 14:05 the following afternoon. Anya described leaving voluntarily with her brother. Their disappearance did not resolve Ruth’s death. Neither child reported entering the workroom that evening.'],
        ['The unresolved account', 'A child witness reported seeing a figure resembling Anya at an upstairs window after the siblings’ apparent departure. A doll and an open wall panel prompted rumours about an older local story. No evidence established a supernatural cause of Ruth’s injuries.'],
        ['Present review', 'Mila, now nineteen, has requested a review following the return of stored circus property. Several supplementary examinations and independently donated records are now available through specific archive leads. Original statements remain unchanged.']
      ], 'An unsolved murder is not proof that every original suspect was guilty. Opened documents are not automatically understood.'),
      paper('E02', 'Mila: the upstairs window', 'Witness statement', 'Mila Bobinsky / interviewer S. Hume', '22 October 2016', 0, [
        ['The search', 'Mum was downstairs calling people. Mr. Pavel said we should look from outside because sometimes you can see a light you cannot see from the stairs. He took me to the front path. I looked up and saw Anya’s red cardigan at Grandfather’s window.'],
        ['What she saw', 'Her hand went sideways, then down, then sideways again. Her face was behind the curtain. I could not see her eyes. I shouted. She did not shout back. Mr. Pavel told me to stay there while he went in.'],
        ['Time', 'Interview annotation: Nadia’s emergency-call recording places this search outside at approximately 20:52. Mila did not wear a watch.'],
        ['The doll', 'Her bed was empty when I first checked it. I did not see the doll then. Later Etta came out holding it. Everyone keeps saying I found it in the bed. I didn’t.']
      ], 'Mila describes colour and movement. “It was Anya” is her interpretation, not a direct view of a face.'),
      paper('E03', 'Nadia: six weeks at home', 'Original interview', 'Nadia Bobinsky', '22 October 2016', 0, [
        ['Returning', 'Dad was ill. I planned six weeks. Alexei cooked; Mila kept lists; Anya could persuade Dad to eat. At seven he counted them, as if I might misplace a child between tea and bedtime. I was tired enough to resent it.'],
        ['The confrontation', 'I challenged Pavel about the tickets around seven-thirty. He said it was a surprise performance. I told him there would be no trips, no photographs, and no promises to Anya without me. Alexei tried to warn me earlier. I thought he was being territorial. I was wrong.'],
        ['The room check', 'At 20:10 I saw both girls in the bedroom. Anya was awake, tucked into the lower bed. Mila was asleep. At 20:40 Mila told me Anya had gone. I cannot account for every minute between those checks.'],
        ['Pavel and Ruth', 'Pavel came in through the front around 20:18. He said the shop had been a nuisance and Ruth had left early. At 19:49 Ruth had texted that she found originals for me. At 20:00 she changed her mind. That was unlike her, but I was settling Dad.']
      ]),
      paper('E04', 'One admission', 'Collected objects', 'Property officer J. Hall', '22 October 2016', 0, [
        ['Ticket wording', 'ONE ADMISSION / THE GRAND RETURN / KEEP YOUR PLACE. Seven red paper tickets collected from Anya’s coat, pillowcase, and a tin beneath the bed. The lower border has a repeated missing square on the left.'],
        ['Anya’s account', 'Pavel gave me the first one. He said Grandfather’s mice might leave the others if I was good at keeping a surprise. I wanted Mum to come. He said she could come after everything was arranged.'],
        ['Useful locator', 'The reverse of one ticket bears the workshop job number PP-12. The recovered restoration file includes the corresponding print job sheet.']
      ], 'All ticket wording and physical details needed for the puzzle are transcribed. You do not need to magnify an image.'),
      paper('E05', 'PP-12: the print job', 'Workshop record', 'M. Finch / copy counter', '18 October 2016', 0, [
        ['The order', 'Job PP-12: twelve small red admission cards. Customer: Pavel Orlov. Paid cash, collected 16:25. Customer supplied a damaged border block; missing lower-left square reproduced on every card.'],
        ['The attached proof', 'The proof reads ONE ADMISSION / THE GRAND RETURN / KEEP YOUR PLACE. This wording and border correspond to the tickets in E04.'],
        ['The old programmes', 'Bobinsky’s retained programmes use blue paper and a hand-drawn mouse seal. He had not commissioned printing during the family’s stay.']
      ], 'The tickets have a documented human source. This establishes who commissioned them, not who killed Ruth.'),
      paper('E06', 'Ruth’s last messages', 'Phone transcript', 'Preserved handset / police extraction', '21 October 2016', 0, [
        ['19:49 · Ruth → Nadia', 'Found the originals. Coming up after I lock the workroom.'],
        ['19:57 · Nadia → Ruth', 'Bring them up. I’m here.'],
        ['20:00 · Ruth’s phone → Nadia', 'Tomorrow instead. All sorted.'],
        ['Earlier unsent draft · 19:38', 'He’s put himself down as her guardian. There is a second letter about the collection. Need to talk without him here.'],
        ['Limits', 'A message sent from this device does not identify the person holding it. There is no recovered recording of the assault.']
      ]),
      paper('E07', 'Medical findings', 'Medical examiner’s summary', 'Dr. L. Hart', '24 October 2016', 0, [
        ['Cause', 'Ruth Mercer sustained a fatal head injury from a heavy blunt object. Injuries to her hand and forearm are consistent with a struggle, although they do not identify the other participant.'],
        ['Survival interval', 'The findings permit a period of survival after the injury. They cannot specify its length, an exact minute of death, or whether intervention would certainly have changed the outcome.'],
        ['Scene relationship', 'The injury is compatible with the type of metal stage counterweight described in the workshop inventory. Compatibility is not identification of one particular object.'],
        ['Time', 'The examination alone does not provide a minute-exact time of death. Witness and movement records must establish the narrower sequence.']
      ], 'This text is the complete relevant medical evidence. No graphic image or outside medical knowledge is required.'),
      paper('E08', 'Bobinsky: count them again', 'Care recording transcript', 'Nadia’s portable recorder', '20–21 October 2016', 0, [
        ['20 October · evening', 'BOBINSKY: One. Two. Three. Good. NADIA: They are all here, Dad. BOBINSKY: That is why we count. Not because they are gone.'],
        ['On the tickets', 'BOBINSKY: Not my printing. My mice do not ask a child to keep a secret from her mother. ANYA: They are only tickets. BOBINSKY: And a door is only a door until somebody invites you through it.'],
        ['On the old story', 'He refers to mice, cheese, a circus, a hole in the wall, Caroline, and a doll. Nadia notes that his alertness varies. She also records that he correctly identified a missing piece of scenery and an overdue medicine delivery.'],
        ['Archive note', 'This transcript preserves his words without deciding whether every reference was literal. A damaged section of the original count recording remains unprocessed.']
      ]),
      paper('E09', 'The eastbound journey', 'Transport corroboration', 'Driver M. Chao / operator records', '21–22 October 2016', 1, [
        ['The stop', 'Driver recalls Alexei and a young girl boarding the 20:31 eastbound service at Orchard Lane. The original ticket-machine roll records one youth and one child fare at that stop. Anya’s retained child ticket matches the journey number.'],
        ['Before boarding', 'Resident Tom Reed saw the siblings leave the Pink Palace front path at approximately 20:22. He recognised Alexei and spoke to him. Alexei said they were visiting a friend.'],
        ['Arrival', 'The service reached Cross Street at 20:47. The operator’s route and timing records put them across town before the later window sighting. A ticket alone cannot prove who used it; the driver and arrival account corroborate it.']
      ]),
      paper('E10', 'Leonie answers the door', 'Original witness statement', 'Leonie Cross', '22 October 2016', 1, [
        ['20:55', 'Alexei arrived with Anya. I let them in. A call to my mother at 20:56 mentions both of them, and Mum independently remembered speaking to Anya. Anya was wearing a yellow raincoat over her nightclothes.'],
        ['What he said', 'He said someone at the house had been making plans for his sister. He wanted to contact their father. I told him he had to tell Nadia where they were. He said he would in the morning. I should have called myself.'],
        ['The following day', 'When I realised a woman had been found dead, I contacted police. Both children remained at my flat until officers arrived. Anya was examined and reunited with Nadia.'],
        ['Limits', 'Leonie cannot describe the workroom or account for Alexei’s movements before he left the Pink Palace.']
      ]),
      paper('E11', 'Alexei: the sister I left', 'Interview: original and follow-up', 'Alexei Bobinsky', '22 October 2016 / 27 October 2026', 1, [
        ['Original account', 'I took Anya. She wasn’t dragged out through a wall. I saw Pavel’s photographs and a letter about taking her away. I tried Mum first. She thought I was just angry. Then I heard her arguing with him and panicked.'],
        ['Why no message?', 'I thought Mum would bring her straight back. That is what I told myself. I was seventeen and I thought being frightened gave me permission to make every decision. I didn’t kill Ruth. I didn’t see her that night.'],
        ['Present-day question: why leave Mila?', 'Because Pavel had singled out Anya. Because Mila was asleep. Neither answer has ever made it all right. I thought I was rescuing somebody. Mila woke up to a house where everyone was gone.'],
        ['A missing garment', 'Anya’s red cardigan was on the stage figure from the afternoon rehearsal. I put her raincoat on because I couldn’t find it quickly.']
      ]),
      paper('E12', 'The waving performer', 'Restoration photograph description', 'Pavel’s workshop catalogue / original negative', '19 October 2016', 2, [
        ['The photographed object', 'A child-sized painted stage figure stands beside the upstairs window. A rigid left hand is joined to a simple demonstration rig. The repair note describes its repeating movement: sideways, down, sideways. It cannot form other gestures.'],
        ['The afternoon demonstration', 'Both girls saw Pavel operate the figure. The workshop sheet records Anya’s red cardigan being used to test the costume mounting.'],
        ['Document provenance', 'The original negative and dated restoration ledger were retained by the exhibition organiser. No person is claimed to be visible inside the figure.'],
        ['Accessible description', 'The hand position, cardigan, and rig are fully described here. This deduction does not require colour perception or recognition of a face.']
      ]),
      paper('E13', 'Mila’s drawing', 'Child’s notebook', 'Mila Bobinsky', '22 October 2016', 2, [
        ['The window drawing', 'A red rectangle for a cardigan, a curtain across the face, and a left hand held straight sideways. Three arrows repeat the same movement. Beneath it: SHE DID NOT SAY ANYTHING.'],
        ['What the interviewer asked', 'Asked whether she saw Anya’s face, Mila answered no. Asked whether Pavel told her which window to watch, she answered yes.'],
        ['A second page', 'A miniature audience is drawn on the following page. One seated figure is labelled RUTH; another chair is labelled MILA. The notebook entered police custody on 22 October. The time the second drawing was made was not independently recorded.']
      ], 'Do not treat an undated drawing as forensic proof of supernatural foreknowledge.'),
      paper('E14', 'The red cardigan', 'Property examination', 'Property officer J. Hall', '23 October 2016', 2, [
        ['Recovery', 'Anya’s cardigan was recovered folded behind the painted stage figure upstairs. It was not among the clothing she wore to Leonie’s flat.'],
        ['Fastening', 'A pair of fresh parallel pressure marks on the inner seam aligns with the figure’s costume clip. The restoration photograph and mounting measurements document the same spacing.'],
        ['Limits', 'These marks show that the garment was mounted on the figure. They do not establish when every use occurred or who operated the mechanism during the search.'],
        ['Search context', 'Etta first found the doll after the outdoor search had begun. Mila’s earlier account describes an empty bed. The two observations occurred at different times.']
      ]),
      paper('E15', 'What the path could show', 'Measured sightline and room plan', 'Scene survey / review', '23 October 2016 / 25 October 2026', 2, [
        ['Front path', 'From Mila’s recorded position, the lower part of the upstairs window is visible. The curtain hides the face area of a figure standing on the rehearsal plinth. A raised rigid hand and cardigan remain visible.'],
        ['Workroom layout', 'The ground-floor workroom has two ordinary entrances: the main corridor door and the service door to the rear yard. The repair bench is beside the inner wall. The trunk stands beyond a movable scenery panel. Neither door is a secret passage.'],
        ['Testing the sighting', 'The measured view is consistent with the photographed stage figure being mistaken for a child. The plan alone cannot identify the operator. Read it beside the independent journey record.']
      ]),
      paper('E16', 'Pavel: I was at the shop', 'Original suspect interview', 'Pavel Orlov', '23 October 2016', 3, [
        ['The alibi', 'Ruth had finished before eight. I was collecting repair supplies from about ten to eight until after eight-fifteen. I came back through the front. I did not go into the workroom during that period.'],
        ['The records', 'Those letters were drafts. Nadia knew I was arranging a revival. “Guardian” was the organiser’s wording. Ruth didn’t understand the process.'],
        ['The search', 'Mila was frightened. I took her outside for air and she thought she saw Anya. I went to look upstairs. I never told her there was anybody at that window.'],
        ['Property', 'My repair bag contained tools used by everyone. I deposited the remaining exhibition property with the organiser the next morning. I did not know anything had been placed in the bag by somebody else.']
      ]),
      paper('E17', 'The rainwater photograph', 'Newly submitted independent image', 'Celia North / neighbour', '21 October 2016, 20:14 / submitted 2026', 3, [
        ['Why it exists', 'Celia photographed the overflowing gutter to request repairs. The original image file was recovered from her retained phone. The timestamp agrees with her message to the property manager and adjacent photographs.'],
        ['What is visible', 'Pavel is exiting the ground-floor service door into the rear yard. He carries a canvas bag with a white stitched crescent repair on the front. His face is visible and Celia independently identifies him.'],
        ['What is not visible', 'The photograph does not show Ruth or an assault. It records Pavel’s location at 20:14, contradicting his claim that he was away at the supply shop throughout this period.'],
        ['Locator', 'The returned-property intake sheet describes a canvas repair bag with the same white crescent patch.']
      ]),
      paper('E18', 'A real receipt, a false alibi', 'Receipt and shop statement', 'Finch Hardware / M. Finch', '21–23 October 2016', 3, [
        ['Receipt', 'Two brushes and one packet of screws. Paid at 18:31 on 21 October 2016. Original till reference FH-184. Pavel later supplied this receipt in support of his shopping account.'],
        ['Shopkeeper', 'Pavel visited around half-past six. The shop closed at 19:00 that Friday. The till record and closing reconciliation corroborate both points. There was no later collection arrangement.'],
        ['The implication', 'The receipt proves a purchase before the workroom confrontation. It cannot place Pavel at the shop between 19:50 and 20:15.'],
        ['Limits', 'A false alibi does not by itself prove murder. Establish what happened in the workroom and connect the physical evidence.']
      ]),
      paper('E19', 'The returned property', 'Custody and intake record', 'M. Finch, exhibition organiser / police property unit', '22 October 2016–24 October 2026', 4, [
        ['Original deposit', 'Pavel deposited a sealed wooden exhibition crate on 22 October 2016. The organiser’s intake photograph shows its contents before closure: a crescent-patched canvas repair bag and a box labelled PERSONAL PAPERS among restoration items. Pavel signed the intake sheet.'],
        ['Storage', 'The numbered crate remained in the organiser’s locked storeroom. It was moved during a building relocation in 2021; records list the same crate number. No contents inventory was made during that move. This is a documented limit, not an unbroken forensic seal.'],
        ['Return', 'After Mila’s appeal, the organiser arranged a witnessed opening on 24 October 2026. The bag contained tools and a metal stage counterweight. The papers box contained a torn envelope and correspondence. Police photographed and separately sealed the returned objects.'],
        ['Corroboration', 'The crescent patch matches the bag in E17. Laboratory results and the envelope comparison can test the contents; custody alone does not establish guilt.']
      ]),
      paper('E20', 'The envelope that tore', 'Physical comparison', 'Archive documents examiner', '25 October 2026', 4, [
        ['The original fragment', 'A torn envelope corner was photographed beneath the workroom bench and collected on 21 October 2016. The original property seal is documented. It bears part of Ruth’s handwritten word NADIA.'],
        ['The returned portion', 'The envelope in Pavel’s PERSONAL PAPERS box contains the complementary edge and remaining letters. The edges physically join along multiple irregular features. This is a physical fit, not a handwriting impression alone.'],
        ['Contents', 'One letter describes Pavel as Anya Bobinsky’s authorised guardian during a proposed travelling revival. An inventory lists several Bobinsky objects as Pavel’s property. Ruth annotated both with questions.'],
        ['Limits', 'The physical fit connects the packet to the workroom and returned papers. It does not identify the hand that tore it.']
      ]),
      paper('E21', 'The organiser’s duplicate', 'Independent correspondence', 'Exhibition organiser / Nadia’s response', '10–20 October 2016', 4, [
        ['What Pavel supplied', 'In a letter dated 10 October, Pavel represented himself as Anya’s authorised guardian for travelling performances and described Bobinsky equipment as items he owned. The organiser retained the incoming letter independently of the returned crate.'],
        ['The requested permission', 'The organiser requested a signed parental authorisation. None was received. Nadia’s preserved response on 20 October states that she granted no travel, performance, or photography permission and that the collection belonged to her father.'],
        ['Ruth’s involvement', 'A covering note from Ruth asks the organiser to preserve duplicates because “the papers Pavel is showing Nadia are not the ones you have.” The organiser replied that originals were in the workroom packet for Nadia.'],
        ['Meaning', 'The duplicate letters corroborate the packet’s contents. Their disputed claims cannot be explained as authorisation Nadia actually gave.']
      ]),
      paper('E22', 'June’s seven-forty-two call', 'Original corroborating statement', 'June Mercer, Ruth’s sister', '22 October 2016', 4, [
        ['The call', 'Ruth called at 19:42. She said, “I found the originals. Nadia needs to see what he’s signing for her.” She sounded cross, not frightened. She intended to go upstairs after locking the workroom. The telephone record corroborates the call time, not its words.'],
        ['Who Ruth was', 'She fixed things before anyone asked. She kept a notebook of everyone’s boiler noises and pretended it was because they would complain otherwise. She was learning the accordion, very badly, and made me listen every Sunday.'],
        ['The next morning', 'People kept asking whether she had seen a child go through a door. My sister had found something a man wanted hidden. I wanted somebody to ask about that.']
      ]),
      paper('E23', 'The counterweight examination', 'Supplementary laboratory report', 'Police laboratory / reviewed summary', '26 October 2026', 5, [
        ['The recovered object', 'Metal stage counterweight from the crescent-patched repair bag, sealed after the witnessed crate opening described in E19. A dated restoration photograph locates an object with the same distinctive old corner repair on the workroom bench before the incident.'],
        ['Biological finding', 'Blood recovered from a recessed surface yields a DNA profile corresponding to Ruth’s retained reference sample. The medical findings are compatible with an assault using an object of this type.'],
        ['Handling limitations', 'Ordinary historic handling of the equipment cannot identify an attacker by touch. The crate’s storage history has a documented move. The report does not assign a date to the blood deposit. Assess it alongside Ruth’s injury, the bag’s photographed removal, statements, and document evidence.'],
        ['Conclusion', 'The object connects Ruth’s blood to equipment removed in Pavel’s bag. The report alone is not a complete reconstruction.']
      ]),
      paper('E24', 'Behind the workroom door', 'Original neighbour statement', 'Arthur Vale', '22 October 2016', 5, [
        ['Before the crash', 'I saw Pavel and Ruth go into the workroom together shortly before eight. I know both of them. The downstairs hall clock was approaching eight; I cannot give an exact minute.'],
        ['The sound', 'I heard a heavy crash around eight. I knocked. A woman said “Nadia” from inside. I recognised Ruth’s voice. Pavel answered through the door: “Just the shelf. She’s gone upstairs.” I did not see either person then.'],
        ['Why he did not enter', 'I thought Ruth was calling upstairs as she went. Pavel said it was all right. I took his answer for an explanation.'],
        ['Original limitation', 'This account was preserved but could not then be independently timed or linked to a recovered weapon. The new photograph and property return did not exist in the original case file.']
      ]),
      paper('E25', 'Etta’s spare key', 'Access review', 'Etta Bell / independently checked records', '2016 statements / 2026 review', 5, [
        ['The concealed fact', 'Etta originally said she had no workroom key because she feared blame for unauthorised storage. The locksmith’s ledger shows she retained a spare. Her argument with Ruth concerned repair spending. Both facts justified investigation.'],
        ['The relevant interval', 'Etta was at a residents’ meeting from 19:45 to 20:20. Two attendees, the signed minutes, and a call she made from the meeting room independently support that interval. The meeting room is a fifteen-minute walk from the Pink Palace.'],
        ['The doll', 'During the later search, Etta found a doll in Anya’s bed. She did not see who put it there. Mila had already reported the bed empty. Etta’s discovery does not establish that the doll was there at 20:40.'],
        ['Conclusion', 'Key access is real. The corroborated movements do not place Etta at the fatal confrontation. A secret and an opportunity are different things.']
      ]),
      paper('E26', 'Ruth’s Sunday list', 'Personal material', 'June Mercer / family permission', 'October 2016', 5, [
        ['Things to remember', 'Fix Nadia’s kitchen catch. Ask Anya whether mice eat pear. Return Etta’s casserole dish before she notices. Accordion practice: twenty minutes, windows shut.'],
        ['A plan of her own', 'Ruth had booked a weekend by the sea with June. Two rail tickets remained in the kitchen drawer. She had written “NO BOILERS” across the envelope.'],
        ['June’s note', 'You can keep the list in the file. Keep the tickets with me. I want people to know she was going somewhere.']
      ]),
      paper('E27', 'Mila’s request for review', 'Present-day submission', 'Mila Bobinsky', '27 October 2026', 0, [
        ['Why now', 'An organiser called about a box of Grandfather’s things. For ten years Alexei’s explanation has sounded like an excuse. He did take Anya. I need to know what else he did.'],
        ['What she wants', 'Please do not change my statement into something cleverer. I saw a cardigan and a waving hand. At nine, that was my sister. If it wasn’t, tell me how.'],
        ['Her memory of Ruth', 'Ruth used to leave a little drawing on the boiler notice when it was fixed. A sun with a terrible face. I remember being angry that the police kept talking about the doll instead.']
      ])
    ],
    deductions: [
      {id:'tickets', title:'Who sent the invitations?', question:'Which explanation of the tickets is supported?', requires:[], stage:0, sources:['E04','E05'], choices:[['human','Pavel commissioned the tickets and used the mouse story to deliver them.'],['beldam','The matching tickets prove the Beldam returned.'],['brother','Alexei printed the tickets to frighten Anya.']], answer:'human', finding:'The tickets have a documented human source: Pavel’s PP-12 print job matches the collected admissions.', next:'The children’s original recovery annex can now be compared with the household account.', hints:['Read the reverse of the admission ticket. A workshop locator is a lead.','Compare E04 with E05. Match job number, wording, and border.','Pin E04 and E05. Choose the explanation naming Pavel’s print order.']},
      {id:'journey', title:'Where did Anya go?', question:'What do the independent journey and arrival accounts establish?', requires:['tickets'], stage:1, sources:['E09','E10'], choices:[['safe','Alexei took Anya across town; they were at Leonie’s while the house was searched.'],['wall','Anya left through the little door after the window sighting.'],['ruth','The bus records prove Alexei killed Ruth before leaving.']], answer:'safe', finding:'Alexei took Anya to Leonie. Transport and arrival accounts corroborate their departure and safety; they do not prove a murder.', next:'Request the restoration material behind the disputed window sighting.', hints:['Do not turn a journey into a murder alibi without checking its time.','E09 tracks travel; E10 independently corroborates arrival and the following day.','Pin E09 and E10. Select the account of Alexei taking Anya to Leonie.']},
      {id:'window', title:'The girl at the window', question:'What could Mila actually have seen?', requires:['journey'], stage:2, sources:['E12','E14','E15'], choices:[['figure','The mounted stage figure could reproduce the cardigan and restricted wave from Mila’s sightline.'],['lie','Mila invented the sighting and should be disregarded.'],['ghost','The sighting proves Anya’s ghost remained upstairs.']], answer:'figure', finding:'The rehearsal figure, mounted cardigan, and measured sightline explain a sincere mistaken identification. Anya’s face was never visible.', next:'Test Pavel’s movements against his supply-shop account.', hints:['A truthful observation can support a mistaken identity.','Combine the mechanism in E12, garment in E14, and view in E15.','Pin E12, E14, and E15; select the mounted stage figure.']},
      {id:'alibi', title:'The missing quarter-hour', question:'Does Pavel’s shopping account survive independent records?', requires:['window'], stage:3, sources:['E17','E18'], choices:[['false','Pavel was at the workroom service door at 20:14; his purchase occurred at 18:31.'],['receipt','The receipt proves he stayed at the shop until 20:15.'],['photo','The photograph alone records the fatal assault.']], answer:'false', finding:'The receipt and independent photograph contradict Pavel’s claimed absence. His bag provides a specific property lead.', next:'The returned-property inventory and original correspondence can now be examined.', hints:['A genuine receipt can still be used for the wrong time.','E17 gives a location at 20:14. E18 gives the actual purchase and closing times.','Pin E17 and E18. Choose the contradiction between the service door and the earlier purchase.']},
      {id:'papers', title:'What Ruth was carrying', question:'What put Ruth’s packet at risk?', requires:['alibi'], stage:4, sources:['E20','E21'], choices:[['fraud','Ruth carried evidence of Pavel’s false authority and ownership claims; the torn packet connects to his returned papers.'],['permission','Nadia had authorised the tour and Ruth misunderstood it.'],['curse','The envelope proves the papers were cursed.']], answer:'fraud', finding:'The joined envelope and independent correspondence establish the dispute Pavel needed to conceal. Nadia had granted no such authority.', next:'The requested object examination and retained neighbour account are ready.', hints:['An envelope’s location and the truth of its contents need different corroboration.','E20 establishes a physical fit. E21 independently preserves the claims and Nadia’s refusal.','Pin E20 and E21. Select the false authority and ownership claims.']},
      {id:'assault', title:'Connect the fatal encounter', question:'What reconstruction survives the physical and witness evidence?', requires:['papers'], stage:5, sources:['E07','E19','E23','E24'], choices:[['pavel','Pavel was with Ruth in distress, lied at the door, and removed the bag containing the blood-bearing compatible object.'],['accident','Ruth’s injury proves an accidental fall; the witness and returned object add nothing.'],['alexei','Alexei’s secret journey identifies him as the attacker.']], answer:'pavel', finding:'Pavel’s presence, false account, removal of the bag, compatible injury, blood-bearing object, and document dispute support the fatal encounter together.', next:'Order the established events, then submit a reconstruction with evidence for the killer and motive.', hints:['The laboratory report explicitly asks you to combine it with custody, injury, and witness accounts.','Use E07 for the injury, E19 for the returned bag, E23 for the examination, and E24 for the encounter.','Pin all four: E07, E19, E23, E24. Select the reconstruction connecting Pavel to Ruth and the removed object.']}
    ],
    events:[
      {id:'encounter',time:'19:53–about 20:02',text:'Ruth and Pavel enter; the crash and call of “Nadia” follow.',source:'E24 + E06'},
      {id:'message',time:'20:00',text:'“Tomorrow instead. All sorted.” is sent from Ruth’s phone.',source:'E06'},
      {id:'exit',time:'20:14',text:'Pavel exits the workroom service door carrying his repair bag.',source:'E17'},
      {id:'depart',time:'about 20:22',text:'Alexei leaves with Anya; their journey is independently corroborated.',source:'E09 + E10'},
      {id:'window',time:'about 20:52',text:'Mila sees the cardigan and repeated wave at the upstairs window.',source:'E02 + E12–E15'},
      {id:'discovery',time:'21:17',text:'A searcher discovers Ruth behind the scenery panel.',source:'E01'}
    ],
    chronology:['encounter','message','exit','depart','window','discovery']
  };
})(typeof window !== 'undefined' ? window : globalThis);
