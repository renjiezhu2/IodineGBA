/* 
 * This file is part of IodineGBA
 *
 * Copyright (C) 2012 Grant Galitz
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 * The full license is available at http://www.gnu.org/licenses/gpl.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 */
function GameBoyAdvanceGraphics(IOCore) {
	this.IOCore = IOCore;
	this.emulatorCore = IOCore.emulatorCore;
	this.initializeIO();
	this.initializeRenderer();
}
GameBoyAdvanceGraphics.prototype.initializeIO = function () {
	//Initialize Pre-Boot:
	this.BGMode = 0;
	this.frameSelect = 0;
	this.HBlankIntervalFree = false;
	this.VRAMOneDimensional = false;
	this.forcedBlank = false;
	this.displayBG0 = false;
	this.displayBG1 = false;
	this.displayBG2 = false;
	this.displayBG3 = false;
	this.displayOBJ = false;
	this.displayWindow0Flag = false;
	this.displayWindow1Flag = false;
	this.displayObjectWindowFlag = false;
	this.greenSwap = false;
	this.inVBlank = false;
	this.inHBlank = false;
	this.VCounterMatch = false;
	this.IRQVBlank = false;
	this.IRQHBlank = false;
	this.IRQVCounter = false;
	this.VCounter = 0;
	this.currentScanLine = 0;
	this.BG0Priority = 0;
	this.BG0CharacterBaseBlock = 0;
	this.BG0Mosaic = false;
	this.BG0Palette256 = false;
	this.BG0ScreenBaseBlock = 0;
	this.BG0DisplayOverflow = false;
	this.BG0ScreenSize = 0;
	this.BG1Priority = 0;
	this.BG1CharacterBaseBlock = 0;
	this.BG1Mosaic = false;
	this.BG1Palette256 = false;
	this.BG1ScreenBaseBlock = 0;
	this.BG1DisplayOverflow = false;
	this.BG1ScreenSize = 0;
	this.BG2Priority = 0;
	this.BG2CharacterBaseBlock = 0;
	this.BG2Mosaic = false;
	this.BG2Palette256 = false;
	this.BG2ScreenBaseBlock = 0;
	this.BG2DisplayOverflow = false;
	this.BG2ScreenSize = 0;
	this.BG3Priority = 0;
	this.BG3CharacterBaseBlock = 0;
	this.BG3Mosaic = false;
	this.BG3Palette256 = false;
	this.BG3ScreenBaseBlock = 0;
	this.BG3DisplayOverflow = false;
	this.BG3ScreenSize = 0;
	this.BG0XCoord = 0;
	this.BG0YCoord = 0;
	this.BG1XCoord = 0;
	this.BG1YCoord = 0;
	this.BG2XCoord = 0;
	this.BG2YCoord = 0;
	this.BG3XCoord = 0;
	this.BG3YCoord = 0;
	this.BG2dx = 0;
	this.BG2dmx = 0;
	this.BG2dy = 0;
	this.BG2dmy = 0;
	this.actualBG2dx = 0;
	this.actualBG2dmx = 0;
	this.actualBG2dy = 0;
	this.actualBG2dmy = 0;
	this.BG3dx = 0;
	this.BG3dmx = 0;
	this.BG3dy = 0;
	this.BG3dmy = 0;
	this.actualBG3dx = 0;
	this.actualBG3dmx = 0;
	this.actualBG3dy = 0;
	this.actualBG3dmy = 0;
	this.BG2ReferenceX = 0;
	this.BG2ReferenceY = 0;
	this.actualBG2ReferenceX = 0;
	this.actualBG2ReferenceY = 0;
	this.BG3ReferenceX = 0;
	this.BG3ReferenceY = 0;
	this.actualBG3ReferenceX = 0;
	this.actualBG3ReferenceY = 0;
	this.WIN0XCoordRight = 0;
	this.WIN0XCoordLeft = 0;
	this.WIN1XCoordRight = 0;
	this.WIN1XCoordLeft = 0;
	this.WIN0YCoordBottom = 0;
	this.WIN0YCoordTop = 0;
	this.WIN1YCoordBottom = 0;
	this.WIN1YCoordTop = 0;
	this.WIN0BG0 = false;
	this.WIN0BG1 = false;
	this.WIN0BG2 = false;
	this.WIN0BG3 = false;
	this.WIN0OBJ = false;
	this.WIN0Effects = false;
	this.WIN1BG0 = false;
	this.WIN1BG1 = false;
	this.WIN1BG2 = false;
	this.WIN1BG3 = false;
	this.WIN1OBJ = false;
	this.WIN1Effects = false;
	this.WINBG0Outside = false;
	this.WINBG1Outside = false;
	this.WINBG2Outside = false;
	this.WINBG3Outside = false;
	this.WINOBJOutside = false;
	this.WINEffectsOutside = false;
	this.WINOBJBG0Outside = false;
	this.WINOBJBG1Outside = false;
	this.WINOBJBG2Outside = false;
	this.WINOBJBG3Outside = false;
	this.WINOBJOBJOutside = false;
	this.WINOBJEffectsOutside = false;
	this.BGMosaicHSize = 0;
	this.BGMosaicVSize = 0;
	this.OBJMosaicHSize = 0;
	this.OBJMosaicVSize = 0;
	this.BG0EffectsTarget1 = false;
	this.BG1EffectsTarget1 = false;
	this.BG2EffectsTarget1 = false;
	this.BG3EffectsTarget1 = false;
	this.OBJEffectsTarget1 = false;
	this.BackdropEffectsTarget1 = false;
	this.colorEffectsType = 0;
	this.BG0EffectsTarget2 = false;
	this.BG1EffectsTarget2 = false;
	this.BG2EffectsTarget2 = false;
	this.BG3EffectsTarget2 = false;
	this.OBJEffectsTarget2 = false;
	this.BackdropEffectsTarget2 = false;
	this.alphaBlendAmountTarget1 = 0;
	this.alphaBlendAmountTarget2 = 0;
	this.brightnessEffectAmount = 0;
	this.paletteRAM = getUint8Array(0x400);
	this.VRAM = getUint8Array(0x18000);
	this.OAMRAM = getUint8Array(0x400);
	this.LCDTicks = 0;
}
GameBoyAdvanceGraphics.prototype.initializeRenderer = function () {
	this.initializeMatrixStorage();
	this.initializePaletteStorage();
	this.initializeLCDControlDispatch();
	this.mode0Renderer = new mode0Renderer(this);
	this.mode1Renderer = new mode1Renderer(this);
	this.mode2Renderer = new mode2Renderer(this);
	this.mode3Renderer = new mode3Renderer(this);
	this.mode4Renderer = new mode4Renderer(this);
	this.mode5Renderer = new mode5Renderer(this);
	this.renderer = this.mode0Renderer();
}
GameBoyAdvanceGraphics.prototype.initializeMatrixStorage = function () {
	this.OBJMatrixParametersRaw = [];
	this.OBJMatrixParameters = [];
	for (var index = 0; index < 0x20;) {
		this.OBJMatrixParametersRaw[index] = [0, 0, 0, 0];
		this.OBJMatrixParameters[index++] = [0, 0, 0, 0];
	}
}
GameBoyAdvanceGraphics.prototype.initializePaletteStorage = function () {
	//Both BG and OAM in unified storage:
	this.palette256 = getInt16Array(0x1FF);
	this.palette16 = [];
	for (var index = 0; index < 0x20;) {
		this.palette16[index++] = getInt16Array(0x10);
	}
}
GameBoyAdvanceGraphics.prototype.initializeLCDControlDispatch = function () {
	this.LCDControlDispatch = [];
	for (var scanlineBuild = 0; scanlineBuild < 159) {
		this.LCDControlDispatch[scanlineBuild++] = this.updateScanLine;
	}
	this.LCDControlDispatch[scanlineBuild++] = this.updateLastVisibleScanLine;
	while (scanlineBuild < 226) {
		this.LCDControlDispatch[scanlineBuild++] = this.updateScanLine;
	}
	this.LCDControlDispatch[226] = this.updateVBlankScanLine226;
	this.LCDControlDispatch[227] = this.updateScanLine;
}
GameBoyAdvanceGraphics.prototype.updateCore = function (clocks) {
	//Call this when clocking the state some more:
	this.LCDTicks += clocks;
	this.LCDControlDispatch[this.currentScanLine](this);
}
GameBoyAdvanceGraphics.prototype.updateScanLine = function (parentObj) {
	if (parentObj.LCDTicks < 1006) {
		parentObj.inHBlank = false;
	}
	else if (parentObj.LCDTicks < 1232) {
		parentObj.updateHBlank();
	}
	else {
		//Make sure we ran the h-blank check this scan line:
		parentObj.updateHBlank();
		//Roll over to the next scan line and update state:
		parentObj.LCDTicks -= 1232;											//We start out at the beginning of the next line.
		++parentObj.currentScanLine;										//Increment scan line to the next one.
		parentObj.checkVCounter();											//We're on a new scan line, so check the VCounter for match.
		parentObj.LCDControlDispatch[parentObj.currentScanLine](parentObj);	//Recursive system to update the LCD state machine.
	}
}
GameBoyAdvanceGraphics.prototype.updateLastVisibleScanLine = function (parentObj) {
	if (parentObj.LCDTicks < 1006) {
		parentObj.inHBlank = false;
	}
	else if (parentObj.LCDTicks < 1232) {
		parentObj.updateHBlank();
	}
	else {
		//Make sure we ran the h-blank check this scan line:
		parentObj.updateHBlank();
		//Roll over to the next scan line and update state:
		parentObj.LCDTicks -= 1232;											//We start out at the beginning of the next line.
		parentObj.inVBlank = true;											//Mark for VBlank.
		if (parentObj.IRQVBlank) {											//Check for VBlank IRQ.
			parentObj.checkForVBlankIRQ();
		}
		parentObj.currentScanLine = 160;									//Increment scan line to the next one.
		parentObj.checkVCounter();											//We're on a new scan line, so check the VCounter for match.
		parentObj.LCDControlDispatch[160](parentObj);						//Recursive system to update the LCD state machine.
	}
}
GameBoyAdvanceGraphics.prototype.updateVBlankScanLine226 = function (parentObj) {
	if (parentObj.LCDTicks < 1006) {
		parentObj.inHBlank = false;
	}
	else if (parentObj.LCDTicks < 1232) {
		parentObj.updateHBlank();
	}
	else {
		//Make sure we ran the h-blank check this scan line:
		parentObj.updateHBlank();
		//Roll over to the next scan line and update state:
		parentObj.LCDTicks -= 1232;											//We start out at the beginning of the next line.
		parentObj.inVBlank = false;											//Mark for line 227 having the vblank flag off.
		parentObj.currentScanLine = 227;									//Increment scan line to the next one.
		parentObj.checkVCounter();											//We're on a new scan line, so check the VCounter for match.
		parentObj.LCDControlDispatch[227](parentObj);						//Recursive system to update the LCD state machine.
	}
}
GameBoyAdvanceGraphics.prototype.updateHBlank = function () {
	if (!this.inHBlank) {													//If we were last in HBlank, don't run this again.
		this.inHBlank = true;
		if (this.IRQHBlank) {
			this.checkForHBlankIRQ();
		}
	}
}
GameBoyAdvanceGraphics.prototype.checkVCounter = function () {
	if (this.currentScanLine == this.VCounter) {							//Check for VCounter match.
		this.VCounterMatch = true;
		if (this.IRQVCounter) {
			this.checkForVCounterIRQ();
		}
	}
	else {
		this.VCounterMatch = false;
	}
}
GameBoyAdvanceGraphics.prototype.writeDISPCNT0 = function (data) {
	this.JIT();
	this.BGMode = data & 0x07;
	this.frameSelect = (data & 0x10) >> 4;
	this.HBlankIntervalFree = ((data & 0x20) == 0x20);
	this.VRAMOneDimensional = ((data & 0x40) == 0x40);
	this.forcedBlank = ((data & 0x80) == 0x80);
	switch (this.BGMode) {
		case 0:
			this.renderer = this.mode0Renderer;
			break;
		case 1:
			this.renderer = this.mode1Renderer;
			break;
		case 2:
			this.renderer = this.mode2Renderer;
			break;
		case 3:
			this.renderer = this.mode3Renderer;
			break;
		case 4:
			this.renderer = this.mode4Renderer;
			break;
		//case 5:
		//Make the prohibited codes select mode 5?
		default:
			this.renderer = this.mode5Renderer;
	}
}
GameBoyAdvanceGraphics.prototype.readDISPCNT0 = function () {
	return (this.BGMode |
	(this.frameSelect << 4) |
	(this.HBlankIntervalFree ? 0x20 : 0) | 
	(this.VRAMOneDimensional ? 0x40 : 0) |
	(this.forcedBlank ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeDISPCNT1 = function (data) {
	this.JIT();
	this.displayBG0 = ((data & 0x01) == 0x01);
	this.displayBG1 = ((data & 0x02) == 0x02);
	this.displayBG2 = ((data & 0x04) == 0x04);
	this.displayBG3 = ((data & 0x08) == 0x08);
	this.displayOBJ = ((data & 0x10) == 0x10);
	this.displayWindow0Flag = ((data & 0x20) == 0x20);
	this.displayWindow1Flag = ((data & 0x40) == 0x40);
	this.displayObjectWindowFlag = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.readDISPCNT1 = function () {
	return ((this.displayBG0 ? 0x1 : 0) |
	(this.displayBG1 ? 0x2 : 0) |
	(this.displayBG2 ? 0x4 : 0) |
	(this.displayBG3 ? 0x8 : 0) |
	(this.displayOBJ ? 0x10 : 0) |
	(this.displayWindow0Flag ? 0x20 : 0) |
	(this.displayWindow1Flag ? 0x40 : 0) |
	(this.displayObjectWindowFlag ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeGreenSwap = function (data) {
	this.JIT();
	this.greenSwap = ((data & 0x01) == 0x01);
}
GameBoyAdvanceGraphics.prototype.readGreenSwap = function () {
	return (this.greenSwap ? 0x1 : 0);
}
GameBoyAdvanceGraphics.prototype.writeDISPSTAT0 = function (data) {
	//VBlank flag read only.
	//HBlank flag read only.
	//V-Counter flag read only.
	//Only LCD IRQ generation enablers can be set here:
	this.IRQVBlank = ((data & 0x08) == 0x08);
	this.IRQHBlank = ((data & 0x10) == 0x10);
	this.IRQVCounter = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readDISPSTAT0 = function () {
	return ((this.inVBlank ? 0x1 : 0) |
	(this.inHBlank ? 0x2 : 0) |
	(this.VCounterMatch ? 0x4 : 0) |
	(this.IRQVBlank ? 0x8 : 0) |
	(this.IRQHBlank ? 0x10 : 0) |
	(this.IRQVCounter ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeDISPSTAT1 = function (data) {
	//V-Counter match value:
	this.VCounter = data;
	this.checkVCounter();
}
GameBoyAdvanceGraphics.prototype.readDISPSTAT1 = function () {
	return this.VCounter;
}
GameBoyAdvanceGraphics.prototype.readVCOUNT = function () {
	return this.currentScanLine;
}
GameBoyAdvanceGraphics.prototype.writeBG0CNT0 = function (data) {
	this.JIT();
	this.BG0Priority = data & 0x3;
	this.BG0CharacterBaseBlock = (data & 0xC) >> 2;
	//Bits 5-6 always 0.
	this.BG0Mosaic = ((data & 0x40) == 0x40);
	this.BG0Palette256 = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.readBG0CNT0 = function () {
	return (this.BG0Priority |
	(this.BG0CharacterBaseBlock << 2) |
	(this.BG0Mosaic ? 0x40 : 0) | 
	(this.BG0Palette256 ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeBG0CNT1 = function (data) {
	this.JIT();
	this.BG0ScreenBaseBlock = data & 0x1F;
	this.BG0DisplayOverflow = ((data & 0x20) == 0x20);	//Note: Only applies to BG2/3 supposedly.
	this.BG0ScreenSize = (data & 0xC0) >> 6;
}
GameBoyAdvanceGraphics.prototype.readBG0CNT1 = function () {
	return (this.BG0ScreenBaseBlock |
	(this.BG0DisplayOverflow ? 0x20 : 0) |
	(this.BG0ScreenSize << 6));
}
GameBoyAdvanceGraphics.prototype.writeBG1CNT0 = function (data) {
	this.JIT();
	this.BG1Priority = data & 0x3;
	this.BG1CharacterBaseBlock = (data & 0xC) >> 2;
	//Bits 5-6 always 0.
	this.BG1Mosaic = ((data & 0x40) == 0x40);
	this.BG1Palette256 = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.readBG1CNT0 = function () {
	return (this.BG1Priority |
	(this.BG1CharacterBaseBlock << 2) |
	(this.BG1Mosaic ? 0x40 : 0) | 
	(this.BG1Palette256 ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeBG1CNT1 = function (data) {
	this.JIT();
	this.BG1ScreenBaseBlock = data & 0x1F;
	this.BG1DisplayOverflow = ((data & 0x20) == 0x20);	//Note: Only applies to BG2/3 supposedly.
	this.BG1ScreenSize = (data & 0xC0) >> 6;
}
GameBoyAdvanceGraphics.prototype.readBG1CNT1 = function () {
	return (this.BG1ScreenBaseBlock |
	(this.BG1DisplayOverflow ? 0x20 : 0) |
	(this.BG1ScreenSize << 6));
}
GameBoyAdvanceGraphics.prototype.writeBG2CNT0 = function (data) {
	this.JIT();
	this.BG2Priority = data & 0x3;
	this.BG2CharacterBaseBlock = (data & 0xC) >> 2;
	//Bits 5-6 always 0.
	this.BG2Mosaic = ((data & 0x40) == 0x40);
	this.BG2Palette256 = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.readBG2CNT0 = function () {
	return (this.BG2Priority |
	(this.BG2CharacterBaseBlock << 2) |
	(this.BG2Mosaic ? 0x40 : 0) | 
	(this.BG2Palette256 ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeBG2CNT1 = function (data) {
	this.JIT();
	this.BG2ScreenBaseBlock = data & 0x1F;
	this.BG2DisplayOverflow = ((data & 0x20) == 0x20);
	this.BG2ScreenSize = (data & 0xC0) >> 6;
}
GameBoyAdvanceGraphics.prototype.readBG2CNT1 = function () {
	return (this.BG2ScreenBaseBlock |
	(this.BG2DisplayOverflow ? 0x20 : 0) |
	(this.BG2ScreenSize << 6));
}
GameBoyAdvanceGraphics.prototype.writeBG3CNT0 = function (data) {
	this.JIT();
	this.BG3Priority = data & 0x3;
	this.BG3CharacterBaseBlock = (data & 0xC) >> 2;
	//Bits 5-6 always 0.
	this.BG3Mosaic = ((data & 0x40) == 0x40);
	this.BG3Palette256 = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.readBG3CNT0 = function () {
	return (this.BG3Priority |
	(this.BG3CharacterBaseBlock << 2) |
	(this.BG3Mosaic ? 0x40 : 0) | 
	(this.BG3Palette256 ? 0x80 : 0));
}
GameBoyAdvanceGraphics.prototype.writeBG3CNT1 = function (data) {
	this.JIT();
	this.BG3ScreenBaseBlock = data & 0x1F;
	this.BG3DisplayOverflow = ((data & 0x20) == 0x20);
	this.BG3ScreenSize = (data & 0xC0) >> 6;
}
GameBoyAdvanceGraphics.prototype.readBG3CNT1 = function () {
	return (this.BG3ScreenBaseBlock |
	(this.BG3DisplayOverflow ? 0x20 : 0) |
	(this.BG3ScreenSize << 6));
}
GameBoyAdvanceGraphics.prototype.writeBG0HOFS0 = function (data) {
	this.JIT();
	this.BG0XCoord = (this.BG0XCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG0HOFS1 = function (data) {
	this.JIT();
	this.BG0XCoord = ((data & 0x01) << 8) | (this.BG0XCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG0VOFS0 = function (data) {
	this.JIT();
	this.BG0YCoord = (this.BG0YCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG0VOFS1 = function (data) {
	this.JIT();
	this.BG0YCoord = ((data & 0x01) << 8) | (this.BG0YCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG1HOFS0 = function (data) {
	this.JIT();
	this.BG1XCoord = (this.BG1XCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG1HOFS1 = function (data) {
	this.JIT();
	this.BG1XCoord = ((data & 0x01) << 8) | (this.BG1XCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG1VOFS0 = function (data) {
	this.JIT();
	this.BG1YCoord = (this.BG1YCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG1VOFS1 = function (data) {
	this.JIT();
	this.BG1YCoord = ((data & 0x01) << 8) | (this.BG1YCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG2HOFS0 = function (data) {
	this.JIT();
	this.BG2XCoord = (this.BG2XCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG2HOFS1 = function (data) {
	this.JIT();
	this.BG2XCoord = ((data & 0x01) << 8) | (this.BG2XCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG2VOFS0 = function (data) {
	this.JIT();
	this.BG2YCoord = (this.BG2YCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG2VOFS1 = function (data) {
	this.JIT();
	this.BG2YCoord = ((data & 0x01) << 8) | (this.BG2YCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG3HOFS0 = function (data) {
	this.JIT();
	this.BG3XCoord = (this.BG3XCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG3HOFS1 = function (data) {
	this.JIT();
	this.BG3XCoord = ((data & 0x01) << 8) | (this.BG3XCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG3VOFS0 = function (data) {
	this.JIT();
	this.BG3YCoord = (this.BG3YCoord & 0x100) | data;
}
GameBoyAdvanceGraphics.prototype.writeBG3VOFS1 = function (data) {
	this.JIT();
	this.BG3YCoord = ((data & 0x01) << 8) | (this.BG3YCoord & 0xFF);
}
GameBoyAdvanceGraphics.prototype.writeBG2PA0 = function (data) {
	this.JIT();
	this.BG2dx = (this.BG2dx & 0xFF00) | data;
	this.actualBG2dx = (this.BG2dx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PA1 = function (data) {
	this.JIT();
	this.BG2dx = (data << 8) | (this.BG2dx & 0xFF);
	this.actualBG2dx = (this.BG2dx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PB0 = function (data) {
	this.JIT();
	this.BG2dmx = (this.BG2dmx & 0xFF00) | data;
	this.actualBG2dmx = (this.BG2dmx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PB1 = function (data) {
	this.JIT();
	this.BG2dmx = (data << 8) | (this.BG2dmx & 0xFF);
	this.actualBG2dmx = (this.BG2dmx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PC0 = function (data) {
	this.JIT();
	this.BG2dy = (this.BG2dy & 0xFF00) | data;
	this.actualBG2dy = (this.BG2dy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PC1 = function (data) {
	this.JIT();
	this.BG2dy = (data << 8) | (this.BG2dy & 0xFF);
	this.actualBG2dy = (this.BG2dy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PD0 = function (data) {
	this.JIT();
	this.BG2dmy = (this.BG2dmx & 0xFF00) | data;
	this.actualBG2dmy = (this.BG2dmy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2PD1 = function (data) {
	this.JIT();
	this.BG2dmy = (data << 8) | (this.BG2dmx & 0xFF);
	this.actualBG2dmy = (this.BG2dmy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PA0 = function (data) {
	this.JIT();
	this.BG3dx = (this.BG3dx & 0xFF00) | data;
	this.actualBG3dx = (this.BG3dx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PA1 = function (data) {
	this.JIT();
	this.BG3dx = (data << 8) | (this.BG3dx & 0xFF);
	this.actualBG3dx = (this.BG3dx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PB0 = function (data) {
	this.JIT();
	this.BG3dmx = (this.BG3dmx & 0xFF00) | data;
	this.actualBG3dmx = (this.BG3dmx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PB1 = function (data) {
	this.JIT();
	this.BG3dmx = (data << 8) | (this.BG3dmx & 0xFF);
	this.actualBG3dmx = (this.BG3dmx << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PC0 = function (data) {
	this.JIT();
	this.BG3dy = (this.BG3dy & 0xFF00) | data;
	this.actualBG3dy = (this.BG3dy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PC1 = function (data) {
	this.JIT();
	this.BG3dy = (data << 8) | (this.BG3dy & 0xFF);
	this.actualBG3dy = (this.BG3dy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PD0 = function (data) {
	this.JIT();
	this.BG3dmy = (this.BG3dmx & 0xFF00) | data;
	this.actualBG3dmy = (this.BG3dmy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG3PD1 = function (data) {
	this.JIT();
	this.BG3dmy = (data << 8) | (this.BG3dmx & 0xFF);
	this.actualBG3dmy = (this.BG3dmy << 16) / 0x1000000;
}
GameBoyAdvanceGraphics.prototype.writeBG2X_L0 = function (data) {
	this.JIT();
	this.BG2ReferenceX = (this.BG2ReferenceX & 0xFFFFF00) | data;
	this.actualBG2ReferenceX = (this.BG2ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2X_L1 = function (data) {
	this.JIT();
	this.BG2ReferenceX = (data << 8) | (this.BG2ReferenceX & 0xFFF00FF);
	this.actualBG2ReferenceX = (this.BG2ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2X_H0 = function (data) {
	this.JIT();
	this.BG2ReferenceX = (data << 16) | (this.BG2ReferenceX & 0xF00FFFF);
	this.actualBG2ReferenceX = (this.BG2ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2X_H1 = function (data) {
	this.JIT();
	this.BG2ReferenceX = ((data & 0xF) << 24) | (this.BG2ReferenceX & 0xFFFFFF);
	this.actualBG2ReferenceX = (this.BG2ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2Y_L0 = function (data) {
	this.JIT();
	this.BG2ReferenceY = (this.BG2ReferenceY & 0xFFFFF00) | data;
	this.actualBG2ReferenceY = (this.BG2ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2Y_L1 = function (data) {
	this.JIT();
	this.BG2ReferenceY = (data << 8) | (this.BG2ReferenceY & 0xFFF00FF);
	this.actualBG2ReferenceY = (this.BG2ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2Y_H0 = function (data) {
	this.JIT();
	this.BG2ReferenceY = (data << 16) | (this.BG2ReferenceY & 0xF00FFFF);
	this.actualBG2ReferenceY = (this.BG2ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG2Y_H1 = function (data) {
	this.JIT();
	this.BG2ReferenceY = ((data & 0xF) << 24) | (this.BG2ReferenceY & 0xFFFFFF);
	this.actualBG2ReferenceY = (this.BG2ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3X_L0 = function (data) {
	this.JIT();
	this.BG3ReferenceX = (this.BG3ReferenceX & 0xFFFFF00) | data;
	this.actualBG3ReferenceX = (this.BG3ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3X_L1 = function (data) {
	this.JIT();
	this.BG3ReferenceX = (data << 8) | (this.BG3ReferenceX & 0xFFF00FF);
	this.actualBG3ReferenceX = (this.BG3ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3X_H0 = function (data) {
	this.JIT();
	this.BG3ReferenceX = (data << 16) | (this.BG3ReferenceX & 0xF00FFFF);
	this.actualBG3ReferenceX = (this.BG3ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3X_H1 = function (data) {
	this.JIT();
	this.BG3ReferenceX = ((data & 0xF) << 24) | (this.BG3ReferenceX & 0xFFFFFF);
	this.actualBG3ReferenceX = (this.BG3ReferenceX << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3Y_L0 = function (data) {
	this.JIT();
	this.BG3ReferenceY = (this.BG3ReferenceY & 0xFFFFF00) | data;
	this.actualBG3ReferenceY = (this.BG3ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3Y_L1 = function (data) {
	this.JIT();
	this.BG3ReferenceY = (data << 8) | (this.BG3ReferenceY & 0xFFF00FF);
	this.actualBG3ReferenceY = (this.BG3ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3Y_H0 = function (data) {
	this.JIT();
	this.BG3ReferenceY = (data << 16) | (this.BG3ReferenceY & 0xF00FFFF);
	this.actualBG3ReferenceY = (this.BG3ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeBG3Y_H1 = function (data) {
	this.JIT();
	this.BG3ReferenceY = ((data & 0xF) << 24) | (this.BG3ReferenceY & 0xFFFFFF);
	this.actualBG3ReferenceY = (this.BG3ReferenceY << 4) / 0x1000;
}
GameBoyAdvanceGraphics.prototype.writeWIN0H0 = function (data) {
	this.JIT();
	this.WIN0XCoordRight = data;		//Window x-coord goes up to this minus 1.
}
GameBoyAdvanceGraphics.prototype.writeWIN0H1 = function (dara) {
	this.JIT();
	this.WIN0XCoordLeft = data;
}
GameBoyAdvanceGraphics.prototype.writeWIN1H0 = function (data) {
	this.JIT();
	this.WIN1XCoordRight = data;		//Window x-coord goes up to this minus 1.
}
GameBoyAdvanceGraphics.prototype.writeWIN1H1 = function (data) {
	this.JIT();
	this.WIN1XCoordLeft = data;
}
GameBoyAdvanceGraphics.prototype.writeWIN0V0 = function (data) {
	this.JIT();
	this.WIN0YCoordBottom = data;		//Window y-coord goes up to this minus 1.
}
GameBoyAdvanceGraphics.prototype.writeWIN0V1 = function (dara) {
	this.JIT();
	this.WIN0YCoordTop = data;
}
GameBoyAdvanceGraphics.prototype.writeWIN1V0 = function (data) {
	this.JIT();
	this.WIN1YCoordBottom = data;		//Window y-coord goes up to this minus 1.
}
GameBoyAdvanceGraphics.prototype.writeWIN1V1 = function (data) {
	this.JIT();
	this.WIN1YCoordTop = data;
}
GameBoyAdvanceGraphics.prototype.writeWININ0 = function (data) {
	//Window 0:
	this.JIT();
	this.WIN0BG0 = ((data & 0x01) == 0x01);
	this.WIN0BG1 = ((data & 0x02) == 0x02);
	this.WIN0BG2 = ((data & 0x04) == 0x04);
	this.WIN0BG3 = ((data & 0x08) == 0x08);
	this.WIN0OBJ = ((data & 0x10) == 0x10);
	this.WIN0Effects = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readWININ0 = function () {
	//Window 0:
	return ((this.WIN0BG0 ? 0x1 : 0) |
	(this.WIN0BG1 ? 0x2 : 0) |
	(this.WIN0BG2 ? 0x4 : 0) |
	(this.WIN0BG3 ? 0x8 : 0) |
	(this.WIN0OBJ ? 0x10 : 0) |
	(this.WIN0Effects ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeWININ1 = function (data) {
	//Window 1:
	this.JIT();
	this.WIN1BG0 = ((data & 0x01) == 0x01);
	this.WIN1BG1 = ((data & 0x02) == 0x02);
	this.WIN1BG2 = ((data & 0x04) == 0x04);
	this.WIN1BG3 = ((data & 0x08) == 0x08);
	this.WIN1OBJ = ((data & 0x10) == 0x10);
	this.WIN1Effects = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readWININ1 = function () {
	//Window 1:
	return ((this.WIN1BG0 ? 0x1 : 0) |
	(this.WIN1BG1 ? 0x2 : 0) |
	(this.WIN1BG2 ? 0x4 : 0) |
	(this.WIN1BG3 ? 0x8 : 0) |
	(this.WIN1OBJ ? 0x10 : 0) |
	(this.WIN1Effects ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeWINOUT0 = function (data) {
	this.JIT();
	this.WINBG0Outside = ((data & 0x01) == 0x01);
	this.WINBG1Outside = ((data & 0x02) == 0x02);
	this.WINBG2Outside = ((data & 0x04) == 0x04);
	this.WINBG3Outside = ((data & 0x08) == 0x08);
	this.WINOBJOutside = ((data & 0x10) == 0x10);
	this.WINEffectsOutside = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readWINOUT0 = function () {
	return ((this.WINBG0Outside ? 0x1 : 0) |
	(this.WINBG1Outside ? 0x2 : 0) |
	(this.WINBG2Outside ? 0x4 : 0) |
	(this.WINBG3Outside ? 0x8 : 0) |
	(this.WINOBJOutside ? 0x10 : 0) |
	(this.WINEffectsOutside ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeWINOUT1 = function (data) {
	this.JIT();
	this.WINOBJBG0Outside = ((data & 0x01) == 0x01);
	this.WINOBJBG1Outside = ((data & 0x02) == 0x02);
	this.WINOBJBG2Outside = ((data & 0x04) == 0x04);
	this.WINOBJBG3Outside = ((data & 0x08) == 0x08);
	this.WINOBJOBJOutside = ((data & 0x10) == 0x10);
	this.WINOBJEffectsOutside = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readWINOUT1 = function () {
	return ((this.WINOBJBG0Outside ? 0x1 : 0) |
	(this.WINOBJBG1Outside ? 0x2 : 0) |
	(this.WINOBJBG2Outside ? 0x4 : 0) |
	(this.WINOBJBG3Outside ? 0x8 : 0) |
	(this.WINOBJOBJOutside ? 0x10 : 0) |
	(this.WINOBJEffectsOutside ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeMOSAIC0 = function (data) {
	this.JIT();
	this.BGMosaicHSize = data & 0xF;
	this.BGMosaicVSize = data >> 4;
}
GameBoyAdvanceGraphics.prototype.writeMOSAIC1 = function (data) {
	this.JIT();
	this.OBJMosaicHSize = data & 0xF;
	this.OBJMosaicVSize = data >> 4;
}
GameBoyAdvanceGraphics.prototype.writeBLDCNT0 = function (data) {
	//Select target 1 and color effects mode:
	this.JIT();
	this.BG0EffectsTarget1 = ((data & 0x01) == 0x01);
	this.BG1EffectsTarget1 = ((data & 0x02) == 0x02);
	this.BG2EffectsTarget1 = ((data & 0x04) == 0x04);
	this.BG3EffectsTarget1 = ((data & 0x08) == 0x08);
	this.OBJEffectsTarget1 = ((data & 0x10) == 0x10);
	this.BackdropEffectsTarget1 = ((data & 0x20) == 0x20);
	this.colorEffectsType = data >> 6;
}
GameBoyAdvanceGraphics.prototype.readBLDCNT0 = function () {
	return ((this.BG0EffectsTarget1 ? 0x1 : 0) |
	(this.BG1EffectsTarget1 ? 0x2 : 0) |
	(this.BG2EffectsTarget1 ? 0x4 : 0) |
	(this.BG3EffectsTarget1 ? 0x8 : 0) |
	(this.OBJEffectsTarget1 ? 0x10 : 0) |
	(this.BackdropEffectsTarget1 ? 0x20 : 0) |
	(this.colorEffectsType << 6));
}
GameBoyAdvanceGraphics.prototype.writeBLDCNT1 = function (data) {
	//Select target 2:
	this.JIT();
	this.BG0EffectsTarget2 = ((data & 0x01) == 0x01);
	this.BG1EffectsTarget2 = ((data & 0x02) == 0x02);
	this.BG2EffectsTarget2 = ((data & 0x04) == 0x04);
	this.BG3EffectsTarget2 = ((data & 0x08) == 0x08);
	this.OBJEffectsTarget2 = ((data & 0x10) == 0x10);
	this.BackdropEffectsTarget2 = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.readBLDCNT1 = function () {
	return ((this.BG0EffectsTarget2 ? 0x1 : 0) |
	(this.BG1EffectsTarget2 ? 0x2 : 0) |
	(this.BG2EffectsTarget2 ? 0x4 : 0) |
	(this.BG3EffectsTarget2 ? 0x8 : 0) |
	(this.OBJEffectsTarget2 ? 0x10 : 0) |
	(this.BackdropEffectsTarget2 ? 0x20 : 0));
}
GameBoyAdvanceGraphics.prototype.writeBLDALPHA0 = function (data) {
	this.JIT();
	this.alphaBlendAmountTarget1 = data & 0x1F;
}
GameBoyAdvanceGraphics.prototype.writeBLDALPHA1 = function (data) {
	this.JIT();
	this.alphaBlendAmountTarget2 = data & 0x1F;
}
GameBoyAdvanceGraphics.prototype.writeBLDY = function (data) {
	this.JIT();
	this.brightnessEffectAmount = data & 0x1F;
}
GameBoyAdvanceGraphics.prototype.writeVRAM = function (address, data) {
	this.JIT();
	this.VRAM[address] = data;
}
GameBoyAdvanceGraphics.prototype.readVRAM = function (address) {
	return this.VRAM[address];
}
GameBoyAdvanceGraphics.prototype.writeOAM = function (address, data) {
	this.JIT();
	var OAMTable = this.OAMTable[address >> 3];
	switch (address & 0x7) {
		//Attrib 0:
		case 0:
			OAMTable.ycoord = data;
			break;
		case 1:
			OAMTable.matrix2D = ((data & 0x1) == 0x1);
			OAMTable.doubleSizeOrDisabled = ((data & 0x2) == 0x2);
			OAMTable.mode = (data >> 2) & 0x3;
			OAMTable.mosaic = ((data & 0x10) == 0x10);
			OAMTable.monolithicPalette = ((data & 0x20) == 0x20);
			OAMTable.shape = data >> 6;
			break;
		//Attrib 1:
		case 2:
			OAMTable.xcoord = (OAMTable.xcoord & 0x100) | data;
			break;
		case 3:
			OAMTable.xcoord = ((data & 0x1) << 8) | (OAMTable.xcoord & 0xFF);
			OAMTable.matrixParameters = (data >> 1) & 0x1F;
			OAMTable.horizontalFlip = ((data & 0x10) == 0x10);
			OAMTable.verticalFlip = ((data & 0x20) == 0x20);
			OAMTable.size = data >> 6;
			break;
		//Attrib 2:
		case 4:
			OAMTable.tileNumber = (OAMTable.tileNumber & 0x300) | data;
			break;
		case 5:
			OAMTable.tileNumber = ((data & 0x3) << 8) | (OAMTable.tileNumber & 0xFF);
			OAMTable.priority = (data >> 2) & 0x3;
			OAMTable.paletteNumber = data >> 4;
			break;
		//Scaling/Rotation Parameter:
		case 6:
			this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] &= 0xFF00;
			this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] |= data;
			this.OBJMatrixParameters[address >> 5][(address >> 3) & 0x3] = (this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] << 16) / 0x1000000;
			break;
		default:
			this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] &= 0x00FF;
			this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] |= data << 8;
			this.OBJMatrixParameters[address >> 5][(address >> 3) & 0x3] = (this.OBJMatrixParametersRaw[address >> 5][(address >> 3) & 0x3] << 16) / 0x1000000;
	}
	this.OAMRAM[address] = data;
}
GameBoyAdvanceGraphics.prototype.readOAM = function (address) {
	return this.OAMRAM[address];
}
GameBoyAdvanceGraphics.prototype.writePalette = function (address, data) {
	this.JIT();
	this.paletteRAM[address] = data;
	this.palette16[address >> 5][(address >> 1) & 0xF] = this.palette256[address >> 1] = ((this.paletteRAM[address | 1] << 8) | this.paletteRAM[address & 0x3FE]) & 0x7FFF;
}
GameBoyAdvanceGraphics.prototype.readPalette = function (address) {
	return this.paletteRAM[address];
}