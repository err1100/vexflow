/**
 * VexFlow - Beam Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

Vex.Flow.Test.Beam = {}

Vex.Flow.Test.Beam.Start = function() {
  module("Beam");
  Vex.Flow.Test.runTest("Simple Beam", Vex.Flow.Test.Beam.simple);
  Vex.Flow.Test.runTest("Multi Beam", Vex.Flow.Test.Beam.multi);
  Vex.Flow.Test.runTest("Sixteenth Beam", Vex.Flow.Test.Beam.sixteenth);
  Vex.Flow.Test.runTest("Slopey Beam", Vex.Flow.Test.Beam.slopey);
  Vex.Flow.Test.runTest("Automatic Beam", Vex.Flow.Test.Beam.auto);
  Vex.Flow.Test.runTest("Mixed Beam", Vex.Flow.Test.Beam.mixed);
  Vex.Flow.Test.runTest("Dotted Beam", Vex.Flow.Test.Beam.dotted);
  Vex.Flow.Test.runTest("Close Trade-offs Beam", Vex.Flow.Test.Beam.tradeoffs);
  Vex.Flow.Test.runTest("Insane Beam", Vex.Flow.Test.Beam.insane);
  Vex.Flow.Test.runTest("Lengthy Beam", Vex.Flow.Test.Beam.lenghty);
  Vex.Flow.Test.runTest("Outlier Beam", Vex.Flow.Test.Beam.outlier);
  Vex.Flow.Test.runTest("Break Secondary Beams", Vex.Flow.Test.Beam.breakSecondaryBeams);
  Vex.Flow.Test.runTest("TabNote Beams Up", Vex.Flow.Test.Beam.tabBeamsUp);
  Vex.Flow.Test.runTest("TabNote Beams Down", Vex.Flow.Test.Beam.tabBeamsDown);
  Vex.Flow.Test.runTest("TabNote Auto Create Beams", Vex.Flow.Test.Beam.autoTabBeams);
  Vex.Flow.Test.runTest("TabNote Beams Auto Stem", Vex.Flow.Test.Beam.tabBeamsAutoStem);
}

Vex.Flow.Test.Beam.beamNotes = function(notes, stave, ctx) {
  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam = new Vex.Flow.Beam(notes.slice(1, notes.length));

  voice.draw(ctx, stave);
  beam.setContext(ctx).draw();
}

Vex.Flow.Test.Beam.setupContext = function(options, x, y) {
  var ctx = new options.contextBuilder(options.canvas_sel, x || 450, y || 140);
  ctx.scale(0.9, 0.9); ctx.fillStyle = "#221"; ctx.strokeStyle = "#221";
  ctx.font = " 10pt Arial";
  var stave = new Vex.Flow.Stave(10, 10, x || 450).addTrebleGlyph().
    setContext(ctx).draw();

  return {context: ctx, stave: stave};
}

Vex.Flow.Test.Beam.simple = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  Vex.Flow.Test.Beam.beamNotes([
    newNote({ keys: ["c/4", "e/4", "a/4"], stem_direction: 1, duration: "h"}).
      addAccidental(0, newAcc("b")).
      addAccidental(1, newAcc("#")),
    newNote({ keys: ["c/4", "e/4", "a/4"], stem_direction: 1, duration: "8"}).
      addAccidental(0, newAcc("b")).
      addAccidental(1, newAcc("#")),
    newNote({ keys: ["d/4", "f/4", "a/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["e/4", "g/4", "b/4"], stem_direction: 1, duration: "8"}).
      addAccidental(0, newAcc("bb")).
      addAccidental(1, newAcc("##")),
    newNote({ keys: ["f/4", "a/4", "c/5"], stem_direction: 1, duration: "8"})
  ], c.stave, c.context);
  ok(true, "Simple Test");
}

Vex.Flow.Test.Beam.multi = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"})
  ];

  var notes2 = [
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  var voice2 = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);
  voice2.addTickables(notes2);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).
    format([voice, voice2], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  var beam2_1 = new Vex.Flow.Beam(notes2.slice(0, 4));
  var beam2_2 = new Vex.Flow.Beam(notes2.slice(4, 8));

  voice.draw(c.context, c.stave);
  voice2.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  beam2_1.setContext(c.context).draw();
  beam2_2.setContext(c.context).draw();
  ok(true, "Multi Test");
}

Vex.Flow.Test.Beam.sixteenth = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "h"})
  ];

  var notes2 = [
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "h"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  var voice2 = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);
  voice2.addTickables(notes2);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).
    format([voice, voice2], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  var beam2_1 = new Vex.Flow.Beam(notes2.slice(0, 4));
  var beam2_2 = new Vex.Flow.Beam(notes2.slice(4, 8));

  voice.draw(c.context, c.stave);
  voice2.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  beam2_1.setContext(c.context).draw();
  beam2_2.setContext(c.context).draw();
  ok(true, "Sixteenth Test");
}

Vex.Flow.Test.Beam.breakSecondaryBeams = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options, 600);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16", end_secondary_beams: true}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),

    newNote({ keys: ["f/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16", end_secondary_beams: true}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16", end_secondary_beams: true}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"})
  ];

  var notes2 = [
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "32", end_secondary_beams: true}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "32"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16", end_secondary_beams: true}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "16"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setStrict(false);
  var voice2 = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setStrict(false);
  voice.addTickables(notes);
  voice2.addTickables(notes2);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice, voice2], 500);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 6));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(6, 12));

  var beam2_1 = new Vex.Flow.Beam(notes2.slice(0, 12));
  var beam2_2 = new Vex.Flow.Beam(notes2.slice(12, 18));

  voice.draw(c.context, c.stave);
  voice2.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  beam2_1.setContext(c.context).draw();
  beam2_2.setContext(c.context).draw();
  ok(true, "Sixteenth Test");
}

Vex.Flow.Test.Beam.slopey = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 350, 140);
  ctx.scale(0.9, 0.9); ctx.fillStyle = "#221"; ctx.strokeStyle = "#221";
  ctx.font = " 10pt Arial";
  var stave = new Vex.Flow.Stave(10, 30, 350).addTrebleGlyph().
    setContext(ctx).draw();

  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/6"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/3"], stem_direction: 1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  voice.draw(ctx, stave);
  beam1_1.setContext(ctx).draw();
  beam1_2.setContext(ctx).draw();

  ok(true, "Slopey Test");
}

Vex.Flow.Test.Beam.auto = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 350, 140);
  ctx.scale(0.9, 0.9); ctx.fillStyle = "#221"; ctx.strokeStyle = "#221";
  ctx.font = " 10pt Arial";
  var stave = new Vex.Flow.Stave(10, 30, 350).addTrebleGlyph().
    setContext(ctx).draw();

  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/6"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/5"], stem_direction: 1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4), true);
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8), true);

  voice.draw(ctx, stave);
  beam1_1.setContext(ctx).draw();
  beam1_2.setContext(ctx).draw();

  ok(true, "Autobeam Test");
}

Vex.Flow.Test.Beam.mixed = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),

    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),

    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "8"})
  ];

  var notes2 = [
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "16"}),

    newNote({ keys: ["d/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["e/4"], stem_direction: -1, duration: "8"}),

    newNote({ keys: ["d/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["c/4"], stem_direction: -1, duration: "16"}),
    newNote({ keys: ["d/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["f/4"], stem_direction: -1, duration: "16"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  var voice2 = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4);
  voice.addTickables(notes);
  voice2.addTickables(notes2);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).
    format([voice, voice2], 390);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  var beam2_1 = new Vex.Flow.Beam(notes2.slice(0, 4));
  var beam2_2 = new Vex.Flow.Beam(notes2.slice(4, 8));

  voice.draw(c.context, c.stave);
  voice2.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  beam2_1.setContext(c.context).draw();
  beam2_2.setContext(c.context).draw();
  ok(true, "Multi Test");
}

Vex.Flow.Test.Beam.dotted = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8d"}).
        addDotToAll(),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "8"}),

    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8d"}).
        addDotToAll(),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["f/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),

    newNote({ keys: ["c/5"], stem_direction: 1, duration: "8d"}).
        addDotToAll(),
    newNote({ keys: ["c/5"], stem_direction: 1, duration: "16"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8d"}).
        addDotToAll(),
    newNote({ keys: ["e/5"], stem_direction: 1, duration: "16"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).
    setMode(Vex.Flow.Voice.Mode.SOFT);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 390);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));
  var beam1_3 = new Vex.Flow.Beam(notes.slice(8, 12));

  voice.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();
  beam1_3.setContext(c.context).draw();

  ok(true, "Dotted Test");
}

Vex.Flow.Test.Beam.tradeoffs = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["a/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["b/4"], stem_direction: 1, duration: "8"}),
  newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["a/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["b/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).
    setMode(Vex.Flow.Voice.Mode.SOFT);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  voice.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  ok(true, "Close Trade-offs Test");
}

Vex.Flow.Test.Beam.insane = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["b/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["a/5"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["b/4"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["c/4"], stem_direction: 1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).
    setMode(Vex.Flow.Voice.Mode.SOFT);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 7));

  voice.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  ok(true, "Insane Test");
}

Vex.Flow.Test.Beam.lenghty = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
  newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
  newNote({ keys: ["a/4"], stem_direction: 1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).
    setMode(Vex.Flow.Voice.Mode.SOFT);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));

  voice.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();

  ok(true, "Lengthy Test");
}

Vex.Flow.Test.Beam.outlier = function(options, contextBuilder) {
  options.contextBuilder = contextBuilder;
  var c = Vex.Flow.Test.Beam.setupContext(options);
  function newNote(note_struct) { return new Vex.Flow.StaveNote(note_struct); }
  function newAcc(type) { return new Vex.Flow.Accidental(type); }

  var notes = [
    newNote({ keys: ["g/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["f/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["e/4"], stem_direction: 1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["c/5"], stem_direction: -1, duration: "8"}),
    newNote({ keys: ["d/5"], stem_direction: -1, duration: "8"})
  ];

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).
    setMode(Vex.Flow.Voice.Mode.SOFT);
  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().
                    joinVoices([voice]).
                    format([voice], 300);
  var beam1_1 = new Vex.Flow.Beam(notes.slice(0, 4));
  var beam1_2 = new Vex.Flow.Beam(notes.slice(4, 8));

  voice.draw(c.context, c.stave);
  beam1_1.setContext(c.context).draw();
  beam1_2.setContext(c.context).draw();

  ok(true, "Outlier Test");
}


Vex.Flow.Test.Beam.tabBeamsUp = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 600, 200);

  ctx.font = "10pt Arial";
  var stave = new Vex.Flow.TabStave(10, 10, 550);
  stave.setContext(ctx);
  stave.draw();

  var specs = [
    { positions: [{str: 3, fret: 6 }, {str: 4, fret: 25}], duration: "4"},
    { positions: [{str: 2, fret: 10 }, {str: 5, fret: 12}], duration: "8"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "32"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "64"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "128"},
    { positions: [{str: 3, fret: 6 }], duration: "8"},
    { positions: [{str: 3, fret: 6 }], duration: "8"},
    { positions: [{str: 3, fret: 6 }], duration: "8"},
    { positions: [{str: 3, fret: 6 }], duration: "8"}
  ];

  var notes = specs.map(function(noteSpec) {
    var tabNote = new Vex.Flow.TabNote(noteSpec);
    tabNote.render_options.draw_stem = true;
    return tabNote;
  });

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);

  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    formatToStave([voice], stave);

  var beam1 = new Vex.Flow.Beam(notes.slice(1, 7));
  var beam2 = new Vex.Flow.Beam(notes.slice(8, 11));

  var tuplet = new Vex.Flow.Tuplet(notes.slice(8, 11));
  tuplet.setRatioed(true);

  voice.draw(ctx, stave);
  beam1.setContext(ctx).draw();
  beam2.setContext(ctx).draw();

  tuplet.setContext(ctx).draw();

  ok (true, 'All objects have been drawn');

};

Vex.Flow.Test.Beam.tabBeamsDown = function(options, contextBuilder) {  
  var ctx = new contextBuilder(options.canvas_sel, 600, 300);

  ctx.font = "10pt Arial";
  var stave = new Vex.Flow.TabStave(10, 10, 550, {
    num_lines: 10
  });
  stave.setContext(ctx);
  stave.draw();

  var specs = [
    { positions: [{str: 3, fret: 6 }, {str: 4, fret: 25}], duration: "4"},
    { positions: [{str: 2, fret: 10 }, {str: 5, fret: 12}], duration: "8dd"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "32"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "64"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "128"},
    { positions: [{str: 1, fret: 6 }], duration: "8"},
    { positions: [{str: 1, fret: 6 }], duration: "8"},
    { positions: [{str: 1, fret: 6 }], duration: "8"},
    { positions: [{str: 7, fret: 6 }], duration: "8"},
    { positions: [{str: 7, fret: 6 }], duration: "8"},
    { positions: [{str: 10, fret: 6 }], duration: "8"},
    { positions: [{str: 10, fret: 6 }], duration: "8"}
  ];

  var notes = specs.map(function(noteSpec) {
    var tabNote = new Vex.Flow.TabNote(noteSpec);
    tabNote.render_options.draw_stem = true;
    tabNote.setStemDirection(-1);
    tabNote.render_options.draw_dots = true;
    return tabNote;
  });

  notes[1].addDot();
  notes[1].addDot();

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);

  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    formatToStave([voice], stave);

  var beam1 = new Vex.Flow.Beam(notes.slice(1, 7));
  var beam2 = new Vex.Flow.Beam(notes.slice(8, 11));

  var tuplet = new Vex.Flow.Tuplet(notes.slice(8, 11));
  var tuplet2 = new Vex.Flow.Tuplet(notes.slice(11, 14));
  tuplet.setTupletLocation(-1);
  tuplet2.setTupletLocation(-1);

  voice.draw(ctx, stave);
  beam1.setContext(ctx).draw();
  beam2.setContext(ctx).draw();
  tuplet.setContext(ctx).draw();
  tuplet2.setContext(ctx).draw();

  ok (true, 'All objects have been drawn');

};


Vex.Flow.Test.Beam.autoTabBeams = function(options, contextBuilder) {  
  var ctx = new contextBuilder(options.canvas_sel, 600, 300);

  ctx.font = "10pt Arial";
  var stave = new Vex.Flow.TabStave(10, 10, 550, {
    num_lines: 6
  });
  stave.setContext(ctx);
  stave.draw();

  var specs = [
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16"},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16"},
    { positions: [{str: 1, fret: 6 }], duration: "32"},
    { positions: [{str: 1, fret: 6 }], duration: "32"},
    { positions: [{str: 1, fret: 6 }], duration: "32"},
    { positions: [{str: 6, fret: 6 }], duration: "32"},
    { positions: [{str: 6, fret: 6 }], duration: "16"},
    { positions: [{str: 6, fret: 6 }], duration: "16"},
    { positions: [{str: 6, fret: 6 }], duration: "16"},
    { positions: [{str: 6, fret: 6 }], duration: "16"}
  ];

  var notes = specs.map(function(noteSpec) {
    var tabNote = new Vex.Flow.TabNote(noteSpec);
    tabNote.render_options.draw_stem = true;
    tabNote.render_options.draw_dots = true;
    return tabNote;
  });

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);

  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    formatToStave([voice], stave);

  var beams = Vex.Flow.Beam.applyAndGetBeams(voice, -1);

  voice.draw(ctx, stave);
  beams.forEach(function(beam) {
      beam.setContext(ctx).draw();
  });

  ok (true, 'All objects have been drawn');

};

// This tests makes sure the auto_stem functionality is works.
// TabNote stems within a beam group should end up normalized
Vex.Flow.Test.Beam.tabBeamsAutoStem = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 600, 300);

  ctx.font = "10pt Arial";
  var stave = new Vex.Flow.TabStave(10, 10, 550, {
    num_lines: 6
  });
  stave.setContext(ctx);
  stave.draw();

  var specs = [
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8", stem_direction: -1},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "8", stem_direction: 1},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16", stem_direction: -1},
    { positions: [{str: 1, fret: 6 }, {str: 4, fret: 5}], duration: "16", stem_direction: 1},
    { positions: [{str: 1, fret: 6 }], duration: "32", stem_direction: 1},
    { positions: [{str: 1, fret: 6 }], duration: "32", stem_direction: -1},
    { positions: [{str: 1, fret: 6 }], duration: "32", stem_direction: -1},
    { positions: [{str: 6, fret: 6 }], duration: "32", stem_direction: -1},
    { positions: [{str: 6, fret: 6 }], duration: "16", stem_direction: 1},
    { positions: [{str: 6, fret: 6 }], duration: "16", stem_direction: 1},
    { positions: [{str: 6, fret: 6 }], duration: "16", stem_direction: 1},
    { positions: [{str: 6, fret: 6 }], duration: "16", stem_direction: -1}
  ];

  var notes = specs.map(function(noteSpec) {
    var tabNote = new Vex.Flow.TabNote(noteSpec);
    tabNote.render_options.draw_stem = true;
    tabNote.render_options.draw_dots = true;
    return tabNote;
  });

  var voice = new Vex.Flow.Voice(Vex.Flow.Test.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);

  voice.addTickables(notes);

  var formatter = new Vex.Flow.Formatter().joinVoices([voice]).
    formatToStave([voice], stave);

  var beams = [
    new Vex.Flow.Beam(notes.slice(0, 8), true), // Stems should format down
    new Vex.Flow.Beam(notes.slice(8, 12), true)  // Stems should format up
  ];

  voice.draw(ctx, stave);
  beams.forEach(function(beam) {
      beam.setContext(ctx).draw();
  });

  ok (true, 'All objects have been drawn');

};