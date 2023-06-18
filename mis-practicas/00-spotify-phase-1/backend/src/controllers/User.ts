import { Request, Response } from "express";
import { handleHttpResponse } from "../utils/handleHttpResponse";
import { getPlaylistsUser, getSongsOfOnePlaylistByUser, getUser } from "../services/users.service";

let statusCode: number = 0;

export const getItems = async ( req: Request, res: Response ): Promise<Response> => {
    try {
        statusCode = 200;
        const userResponse = await getUser();
        return res.status(statusCode).json({ statusCode: statusCode, data: userResponse });
    } catch (error) {
        statusCode = ( statusCode !== 0 ) ? statusCode : 500
        return handleHttpResponse( res, statusCode, 'HTTP_GET_USER_ERROR', error );
    }
}

export const getItemsByUserId = async ( req: Request, res: Response ): Promise<Response> => {
    try {
        statusCode = 200;
        const { userId } = req.params;
        const userResponse = await getPlaylistsUser( userId );
        return res.status(statusCode).json({ statusCode: statusCode, data: userResponse[0] });
    } catch( error ) {
        statusCode = ( statusCode !== 0 ) ? statusCode : 500
        return handleHttpResponse( res, statusCode, 'HTTP_GET_USER_PLAYLISTS_ERROR', error );
    } 
}

export const getItemsByUserIdAndPlaylistsId = async ( req: Request, res: Response ): Promise<Response> => {
    try {
        statusCode = 200
        const { userId, playlistId } = req.params;
        const userResponse = await getSongsOfOnePlaylistByUser( userId, playlistId );
        return res.status(statusCode).json({ statusCode: statusCode, data: userResponse[0] });
    } catch (error) {
        statusCode = ( statusCode !== 0 ) ? statusCode : 500;
        return handleHttpResponse( res, statusCode, 'HTTP_GET_USER_SONGS_PLAYLIST_ERROR', error );
    }
}