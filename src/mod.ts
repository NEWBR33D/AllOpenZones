/* 
 * AllOpenZones v1.0.4
 * MIT License
 * Copyright (c) 2023 PreyToLive
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/brace-style*/

import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import pkg from "../package.json";
import config from "../config/config.json";

class AllOpenZones implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const locations = container.resolve<DatabaseServer>("DatabaseServer").getTables().locations;
        const console = config.consoleLogs;
        const { customs, interchange, labs, lighthouse, reserve, shoreline, streets, woods } = config.allOpenZones;
        const maps = { customs, interchange, labs, lighthouse, reserve, shoreline, streets, woods }
        const openZones = {
            "bigmap": "ZoneBlockPost,ZoneBlockPostSniper,ZoneBlockPostSniper3,ZoneBrige,ZoneCrossRoad,ZoneCustoms,ZoneDormitory,ZoneFactoryCenter,ZoneFactorySide,ZoneGasStation,ZoneOldAZS,ZoneScavBase,ZoneSnipeBrige,ZoneSnipeFactory,ZoneSnipeTower,ZoneTankSquare,ZoneWade",
            "interchange": "ZoneCenter,ZoneCenterBot,ZoneGoshan,ZoneIDEA,ZoneIDEAPark,ZoneOLI,ZoneOLIPark,ZonePowerStation,ZoneRoad,ZoneTrucks",
            "laboratory": "BotZoneBasement,BotZoneFloor1,BotZoneFloor2,BotZoneGate1,BotZoneGate2",
            "lighthouse": "Zone_Blockpost,Zone_Bridge,Zone_Chalet,Zone_Containers,Zone_DestroyedHouse,Zone_Hellicopter,Zone_Island,Zone_LongRoad,Zone_OldHouse,Zone_Rocks,Zone_RoofBeach,Zone_RoofContainers,Zone_RoofRocks,Zone_SniperPeak,Zone_TreatmentBeach,Zone_TreatmentContainers,Zone_TreatmentRocks,Zone_Village",
            "rezervbase": "ZoneBarrack,ZoneBunkerStorage,ZonePTOR1,ZonePTOR2,ZoneRailStrorage,ZoneSubCommand,ZoneSubStorage",
            "shoreline": "ZoneBunker,ZoneBunkeSniper,ZoneBusStation,ZoneForestGasStation,ZoneForestSpawn,ZoneForestTruck,ZoneGasStation,ZoneGreenHouses,ZoneIsland,ZoneMeteoStation,ZonePassClose,ZonePassFar,ZonePort,ZonePowerStation,ZonePowerStationSniper,ZoneRailWays,ZoneSanatorium1,ZoneSanatorium2,ZoneTunnel,ZoneStartVillage",
            "tarkovstreets": "ZoneCarShowroom,ZoneCinema,ZoneColumn,ZoneConcordia_1,ZoneConcordia_2,ZoneConcordiaParking,ZoneConstruction,ZoneFactory,ZoneHotel_1,ZoneHotel_2,ZoneSnipeBuilding,ZoneSnipeCarShowroom,ZoneSnipeCinema,ZoneSnipeSW01,ZoneSW01",
            "woods": "ZoneBigRocks,ZoneBrokenVill,ZoneClearVill,ZoneHighRocks,ZoneHouse,ZoneMiniHouse,ZoneRedHouse,ZoneRoad,ZoneScavBase2,ZoneWoodCutter"
        }
        
        switch (true) {
            case customs:
                locations["bigmap"].base.OpenZones = openZones["bigmap"];
                break;
            case interchange:
                locations["interchange"].base.OpenZones = openZones["interchange"];
                break;
            case labs:
                locations["laboratory"].base.OpenZones = openZones["laboratory"];
                break;
            case lighthouse:
                locations["lighthouse"].base.OpenZones = openZones["lighthouse"];
                break;
            case reserve:
                locations["rezervbase"].base.OpenZones = openZones["rezervbase"];
                break;
            case shoreline:
                locations["shoreline"].base.OpenZones = openZones["shoreline"];
                break;
            case streets:
                locations["tarkovstreets"].base.OpenZones = openZones["tarkovstreets"];
                break;
            case woods:
                locations["woods"].base.OpenZones = openZones["woods"];
                break;
            default:
                break;
        }

        if (console) {
            for (const [map, enabled] of Object.entries(maps)) {
                logger.log(`Mod: ${pkg.name}: console logs`, "green");
                if (enabled) {
                    logger.log(`  -> allOpenZones[${map}][enabled]`, "green");
                } else {
                    logger.log(`  -> allOpenZones[${map}][disabled]`, "yellow");
                }
            }
        }
    }
}

module.exports = { mod: new AllOpenZones() };